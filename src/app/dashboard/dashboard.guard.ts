import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth/auth.state';

@Injectable({ providedIn: 'root' })
export class DashboardGuard implements CanActivate, CanLoad {

  constructor(
    private readonly router: Router,
    private readonly store: Store
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasReadAccess();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasReadAccess();
  }

  private hasReadAccess(): boolean | UrlTree {
    const token = this.store.selectSnapshot(AuthState.token);
    if (!!token && token.isValid() && token.hasAuthority('READ_ACCESS')) {
      return true;
    }
    return this.router.createUrlTree(['/login'], { queryParams: {'redirect': 'dashboard' } });
  }

}
