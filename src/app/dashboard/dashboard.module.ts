import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ProductsModule } from './products/products.module';
import { ShippingModule } from './shipping/shipping.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    OrdersModule,
    CategoriesModule,
    ConfigurationModule,
    ProductsModule,
    ShippingModule,
    TagsModule,
    UsersModule
  ]
})
export class DashboardModule { }
