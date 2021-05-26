import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserDto } from '../api/models';
import { UsersService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { AuthState } from '../auth/auth.state';
import { DashboardState } from './dashboard.state';
import * as DashboardActions from './dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(DashboardState.user)
  user$!: Observable<UserDto | undefined>;

  constructor(
    private readonly store: Store,
    private readonly spinner: NgxSpinnerService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
    const token = this.store.selectSnapshot(AuthState.token);
    if (!token || !token.isValid()) {
      return;
    }
    this.spinner.show();
    this.usersService.get({
      userId: token.sub
    })
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe({
      next: response => this.store.dispatch(new DashboardActions.Initialize(response))
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
