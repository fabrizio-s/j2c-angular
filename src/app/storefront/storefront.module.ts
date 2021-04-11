import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorefrontRoutingModule } from './storefront-routing.module';
import { StorefrontComponent } from './storefront.component';


@NgModule({
  declarations: [
    StorefrontComponent
  ],
  imports: [
    CommonModule,
    StorefrontRoutingModule
  ]
})
export class StorefrontModule { }
