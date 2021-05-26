import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardGuard } from './dashboard.guard';
import { HomeComponent } from './home/home.component';
import { CreateFulfillmentComponent } from './orders/create-fulfillment/create-fulfillment.component';
import { FulfillmentDetailsComponent } from './orders/fulfillment-details/fulfillment-details.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShippingComponent } from './shipping/shipping.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [DashboardGuard], canLoad: [DashboardGuard], children: [
      {
        path: 'orders',
        children: [
          { path: ':orderId', component: OrderDetailsComponent },
          { path: ':orderId/fulfillments/:fulfillmentId', pathMatch: 'full', component: FulfillmentDetailsComponent },
          { path: ':orderId/create-fulfillment', pathMatch: 'full', component: CreateFulfillmentComponent },
          { path: '', component: OrdersComponent },
        ]
      },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'users', component: UsersComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
