import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'storefront', loadChildren: () => import('./storefront/storefront.module').then(mod => mod.StorefrontModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // TODO: change back to 'storefront'!
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
