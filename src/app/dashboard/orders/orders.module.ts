import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { NgxsModule } from '@ngxs/store';
import { OrdersState } from './orders.state';
import { AppSharedModule } from 'src/app/shared/app-shared.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderDetailsState } from './order-details/order-details.state';
import { DashboardSharedModule } from '../shared/dashboard-shared.module';
import { FulfillmentDetailsComponent } from './fulfillment-details/fulfillment-details.component';
import { FulfillmentDetailsState } from './fulfillment-details/fulfillment-details.state';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    FulfillmentDetailsComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([OrdersState, OrderDetailsState, FulfillmentDetailsState]),
    AppSharedModule,
    DashboardSharedModule
  ]
})
export class OrdersModule { }
