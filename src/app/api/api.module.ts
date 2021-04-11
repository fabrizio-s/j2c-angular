/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CheckoutService } from './services/checkout.service';
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';
import { ShippingService } from './services/shipping.service';
import { AuthenticationService } from './services/authentication.service';
import { OrdersService } from './services/orders.service';
import { ImagesService } from './services/images.service';
import { ConfigurationService } from './services/configuration.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CheckoutService,
    UsersService,
    ProductsService,
    ShippingService,
    AuthenticationService,
    OrdersService,
    ImagesService,
    ConfigurationService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
