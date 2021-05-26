import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { DashboardState } from './dashboard.state';
import { AppSharedModule } from '../shared/app-shared.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { FulfillmentDetailsComponent } from './orders/fulfillment-details/fulfillment-details.component';
import { CategoriesComponent } from './categories/categories.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ProductsComponent } from './products/products.component';
import { ShippingComponent } from './shipping/shipping.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';
import { CreateFulfillmentComponent } from './orders/create-fulfillment/create-fulfillment.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CategoriesComponent,
    ConfigurationComponent,
    ProductsComponent,
    ShippingComponent,
    TagsComponent,
    UsersComponent,
    OrdersComponent,
    OrderDetailsComponent,
    FulfillmentDetailsComponent,
    CreateFulfillmentComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([DashboardState]),
    ReactiveFormsModule,
    DashboardRoutingModule,
    AppSharedModule,
    NgxJsonViewerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule
  ]
})
export class DashboardModule { }
