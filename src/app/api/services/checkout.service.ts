/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CheckoutDto } from '../models/checkout-dto';
import { CheckoutLineDto } from '../models/checkout-line-dto';
import { CreateCheckoutAddressForm } from '../models/create-checkout-address-form';
import { CreateCheckoutForm } from '../models/create-checkout-form';
import { CreateCheckoutShippingAddressForm } from '../models/create-checkout-shipping-address-form';
import { OrderDto } from '../models/order-dto';
import { PageCheckoutDto } from '../models/page-checkout-dto';
import { PageCheckoutLineDto } from '../models/page-checkout-line-dto';
import { SetCheckoutAddressForm } from '../models/set-checkout-address-form';
import { SetCheckoutShippingAddressForm } from '../models/set-checkout-shipping-address-form';
import { SetCheckoutShippingMethodForm } from '../models/set-checkout-shipping-method-form';
import { UpdateCheckoutAddressForm } from '../models/update-checkout-address-form';
import { UpdateCheckoutShippingAddressForm } from '../models/update-checkout-shipping-address-form';
import { UseSingleAddressForm } from '../models/use-single-address-form';


/**
 * Endpoints related to checkout sessions
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation setShippingMethod
   */
  static readonly SetShippingMethodPath = '/api/checkouts/{checkoutId}/shipping-method';

  /**
   * Set the shipping method of the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setShippingMethod()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setShippingMethod$Response(params: {
    checkoutId: number;
    body: SetCheckoutShippingMethodForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.SetShippingMethodPath, 'put');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Set the shipping method of the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setShippingMethod$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setShippingMethod(params: {
    checkoutId: number;
    body: SetCheckoutShippingMethodForm
  }): Observable<CheckoutDto> {

    return this.setShippingMethod$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation setShippingAddress
   */
  static readonly SetShippingAddressPath = '/api/checkouts/{checkoutId}/shipping-address';

  /**
   * Set the shipping address of the currently authenticated user's checkout session to an existing user address.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setShippingAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setShippingAddress$Response(params: {
    checkoutId: number;
    body: SetCheckoutShippingAddressForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.SetShippingAddressPath, 'put');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Set the shipping address of the currently authenticated user's checkout session to an existing user address.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setShippingAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setShippingAddress(params: {
    checkoutId: number;
    body: SetCheckoutShippingAddressForm
  }): Observable<CheckoutDto> {

    return this.setShippingAddress$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation createShippingAddress
   */
  static readonly CreateShippingAddressPath = '/api/checkouts/{checkoutId}/shipping-address';

  /**
   * Adds a shipping address to the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createShippingAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createShippingAddress$Response(params: {
    checkoutId: number;
    body: CreateCheckoutShippingAddressForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.CreateShippingAddressPath, 'post');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Adds a shipping address to the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createShippingAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createShippingAddress(params: {
    checkoutId: number;
    body: CreateCheckoutShippingAddressForm
  }): Observable<CheckoutDto> {

    return this.createShippingAddress$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation updateShippingAddress
   */
  static readonly UpdateShippingAddressPath = '/api/checkouts/{checkoutId}/shipping-address';

  /**
   * Updates the shipping address of the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. The checkout session must already have an existing shipping address. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShippingAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateShippingAddress$Response(params: {
    checkoutId: number;
    body: UpdateCheckoutShippingAddressForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.UpdateShippingAddressPath, 'patch');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Updates the shipping address of the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. The checkout session must already have an existing shipping address. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateShippingAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateShippingAddress(params: {
    checkoutId: number;
    body: UpdateCheckoutShippingAddressForm
  }): Observable<CheckoutDto> {

    return this.updateShippingAddress$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation setAddress
   */
  static readonly SetAddressPath = '/api/checkouts/{checkoutId}/address';

  /**
   * Set the address of the currently authenticated user's checkout session to an existing user address.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setAddress$Response(params: {
    checkoutId: number;
    body: SetCheckoutAddressForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.SetAddressPath, 'put');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Set the address of the currently authenticated user's checkout session to an existing user address.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setAddress(params: {
    checkoutId: number;
    body: SetCheckoutAddressForm
  }): Observable<CheckoutDto> {

    return this.setAddress$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation createAddress
   */
  static readonly CreateAddressPath = '/api/checkouts/{checkoutId}/address';

  /**
   * Add an address to the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAddress$Response(params: {
    checkoutId: number;
    body: CreateCheckoutAddressForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.CreateAddressPath, 'post');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Add an address to the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAddress(params: {
    checkoutId: number;
    body: CreateCheckoutAddressForm
  }): Observable<CheckoutDto> {

    return this.createAddress$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation updateAddress
   */
  static readonly UpdateAddressPath = '/api/checkouts/{checkoutId}/address';

  /**
   * Update the address of the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. The checkout session must already have an existing address. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress$Response(params: {
    checkoutId: number;
    body: UpdateCheckoutAddressForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.UpdateAddressPath, 'patch');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Update the address of the currently authenticated user's checkout session.
   *
   * Returns the updated checkout session. The checkout session must already have an existing address. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress(params: {
    checkoutId: number;
    body: UpdateCheckoutAddressForm
  }): Observable<CheckoutDto> {

    return this.updateAddress$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation getAll
   */
  static readonly GetAllPath = '/api/checkouts';

  /**
   * Retrieves all the currently active checkout sessions.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll$Response(params?: {

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
  }): Observable<StrictHttpResponse<PageCheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.GetAllPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageCheckoutDto>;
      })
    );
  }

  /**
   * Retrieves all the currently active checkout sessions.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll(params?: {

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
  }): Observable<PageCheckoutDto> {

    return this.getAll$Response(params).pipe(
      map((r: StrictHttpResponse<PageCheckoutDto>) => r.body as PageCheckoutDto)
    );
  }

  /**
   * Path part for operation checkout
   */
  static readonly CheckoutPath = '/api/checkouts';

  /**
   * Creates a new checkout session for the authenticated user.
   *
   * Returns the created checkout session and its lines. Must be authenticated to perform, and a user may not have more than one active checkout session at a time.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkout()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkout$Response(params: {
    body: CreateCheckoutForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.CheckoutPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Creates a new checkout session for the authenticated user.
   *
   * Returns the created checkout session and its lines. Must be authenticated to perform, and a user may not have more than one active checkout session at a time.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `checkout$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkout(params: {
    body: CreateCheckoutForm
  }): Observable<CheckoutDto> {

    return this.checkout$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation useSingleAddress
   */
  static readonly UseSingleAddressPath = '/api/checkouts/{checkoutId}/single-address';

  /**
   * Set the currently authenticated user's checkout session to use the same address for both billing and shipping.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `useSingleAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  useSingleAddress$Response(params: {
    checkoutId: number;
    body: UseSingleAddressForm
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.UseSingleAddressPath, 'post');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Set the currently authenticated user's checkout session to use the same address for both billing and shipping.
   *
   * Returns the updated checkout session. Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `useSingleAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  useSingleAddress(params: {
    checkoutId: number;
    body: UseSingleAddressForm
  }): Observable<CheckoutDto> {

    return this.useSingleAddress$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation complete
   */
  static readonly CompletePath = '/api/checkouts/{checkoutId}/complete';

  /**
   * Completes a checkout session by capturing the required amount.
   *
   * Returns the created order and its lines. The checkout session must have all required information (i.e. shipping method (if required), shipping address (if required), billing address and payment method). Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `complete()` instead.
   *
   * This method doesn't expect any request body.
   */
  complete$Response(params: {
    checkoutId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.CompletePath, 'post');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderDto>;
      })
    );
  }

  /**
   * Completes a checkout session by capturing the required amount.
   *
   * Returns the created order and its lines. The checkout session must have all required information (i.e. shipping method (if required), shipping address (if required), billing address and payment method). Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `complete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  complete(params: {
    checkoutId: number;
  }): Observable<OrderDto> {

    return this.complete$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/api/checkouts/{checkoutId}';

  /**
   * Retrieves a checkout session by its id.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: {
    checkoutId: number;
  }): Observable<StrictHttpResponse<CheckoutDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.GetPath, 'get');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutDto>;
      })
    );
  }

  /**
   * Retrieves a checkout session by its id.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: {
    checkoutId: number;
  }): Observable<CheckoutDto> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutDto>) => r.body as CheckoutDto)
    );
  }

  /**
   * Path part for operation cancel
   */
  static readonly CancelPath = '/api/checkouts/{checkoutId}';

  /**
   * Cancel the currently authenticated user's checkout session.
   *
   * Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancel()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancel$Response(params: {
    checkoutId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.CancelPath, 'delete');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Cancel the currently authenticated user's checkout session.
   *
   * Requires ownership of the resource or WRITE_CHECKOUT authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cancel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancel(params: {
    checkoutId: number;
  }): Observable<void> {

    return this.cancel$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getLines
   */
  static readonly GetLinesPath = '/api/checkouts/{checkoutId}/lines';

  /**
   * Retrieves the lines of the checkout session with the supplied id.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLines()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLines$Response(params: {
    checkoutId: number;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
  }): Observable<StrictHttpResponse<PageCheckoutLineDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.GetLinesPath, 'get');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageCheckoutLineDto>;
      })
    );
  }

  /**
   * Retrieves the lines of the checkout session with the supplied id.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLines$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLines(params: {
    checkoutId: number;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
  }): Observable<PageCheckoutLineDto> {

    return this.getLines$Response(params).pipe(
      map((r: StrictHttpResponse<PageCheckoutLineDto>) => r.body as PageCheckoutLineDto)
    );
  }

  /**
   * Path part for operation getLine
   */
  static readonly GetLinePath = '/api/checkouts/{checkoutId}/lines/{lineId}';

  /**
   * Retrieves a single line by id of the specified checkout session.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLine()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLine$Response(params: {
    checkoutId: number;
    lineId: number;
  }): Observable<StrictHttpResponse<CheckoutLineDto>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.GetLinePath, 'get');
    if (params) {
      rb.path('checkoutId', params.checkoutId, {});
      rb.path('lineId', params.lineId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CheckoutLineDto>;
      })
    );
  }

  /**
   * Retrieves a single line by id of the specified checkout session.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLine$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLine(params: {
    checkoutId: number;
    lineId: number;
  }): Observable<CheckoutLineDto> {

    return this.getLine$Response(params).pipe(
      map((r: StrictHttpResponse<CheckoutLineDto>) => r.body as CheckoutLineDto)
    );
  }

}
