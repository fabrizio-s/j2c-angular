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

import { CompleteOrderFulfillmentForm } from '../models/complete-order-fulfillment-form';
import { Line } from '../models/line';
import { OrderDto } from '../models/order-dto';
import { OrderFulfillmentDto } from '../models/order-fulfillment-dto';
import { OrderFulfillmentLineDto } from '../models/order-fulfillment-line-dto';
import { OrderLineDto } from '../models/order-line-dto';
import { PageOrderDto } from '../models/page-order-dto';
import { PageOrderFulfillmentDto } from '../models/page-order-fulfillment-dto';
import { PageOrderFulfillmentLineDto } from '../models/page-order-fulfillment-line-dto';
import { PageOrderLineDto } from '../models/page-order-line-dto';
import { UpdateOrderFulfillmentTrackingNumberForm } from '../models/update-order-fulfillment-tracking-number-form';


/**
 * Endpoints related to orders
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation undoFulfill
   */
  static readonly UndoFulfillPath = '/api/orders/{orderId}/undo-fulfill';

  /**
   * Returns the fulfilled order to its previous state.
   *
   * Returns the updated order. The order must have the status FULFILLED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `undoFulfill()` instead.
   *
   * This method doesn't expect any request body.
   */
  undoFulfill$Response(params: {
    orderId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.UndoFulfillPath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
   * Returns the fulfilled order to its previous state.
   *
   * Returns the updated order. The order must have the status FULFILLED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `undoFulfill$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  undoFulfill(params: {
    orderId: number;
  }): Observable<OrderDto> {

    return this.undoFulfill$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation reinstate
   */
  static readonly ReinstatePath = '/api/orders/{orderId}/reinstate';

  /**
   * Returns a cancelled order to its previous state.
   *
   * Returns the updated order. The order must have the status CANCELLED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reinstate()` instead.
   *
   * This method doesn't expect any request body.
   */
  reinstate$Response(params: {
    orderId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.ReinstatePath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
   * Returns a cancelled order to its previous state.
   *
   * Returns the updated order. The order must have the status CANCELLED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `reinstate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reinstate(params: {
    orderId: number;
  }): Observable<OrderDto> {

    return this.reinstate$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation getFulfillments
   */
  static readonly GetFulfillmentsPath = '/api/orders/{orderId}/fulfillments';

  /**
   * Retrieves the fulfillments of the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFulfillments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillments$Response(params: {
    orderId: number;

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
  }): Observable<StrictHttpResponse<PageOrderFulfillmentDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetFulfillmentsPath, 'get');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
        return r as StrictHttpResponse<PageOrderFulfillmentDto>;
      })
    );
  }

  /**
   * Retrieves the fulfillments of the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFulfillments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillments(params: {
    orderId: number;

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
  }): Observable<PageOrderFulfillmentDto> {

    return this.getFulfillments$Response(params).pipe(
      map((r: StrictHttpResponse<PageOrderFulfillmentDto>) => r.body as PageOrderFulfillmentDto)
    );
  }

  /**
   * Path part for operation createFulfillment
   */
  static readonly CreateFulfillmentPath = '/api/orders/{orderId}/fulfillments';

  /**
   * Creates a fulfillment for the order with the given id.
   *
   * Returns the updated order and order lines, and the created fulfillment and its lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFulfillment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFulfillment$Response(params: {
    orderId: number;
    body: Array<Line>
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.CreateFulfillmentPath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.body(params.body, 'application/json');
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
   * Creates a fulfillment for the order with the given id.
   *
   * Returns the updated order and order lines, and the created fulfillment and its lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createFulfillment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFulfillment(params: {
    orderId: number;
    body: Array<Line>
  }): Observable<OrderDto> {

    return this.createFulfillment$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation getFulfillmentLines
   */
  static readonly GetFulfillmentLinesPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}/lines';

  /**
   * Retrieves the lines of the specified fulfillment.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFulfillmentLines()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillmentLines$Response(params: {
    orderId: number;
    fulfillmentId: number;

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
  }): Observable<StrictHttpResponse<PageOrderFulfillmentLineDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetFulfillmentLinesPath, 'get');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
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
        return r as StrictHttpResponse<PageOrderFulfillmentLineDto>;
      })
    );
  }

  /**
   * Retrieves the lines of the specified fulfillment.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFulfillmentLines$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillmentLines(params: {
    orderId: number;
    fulfillmentId: number;

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
  }): Observable<PageOrderFulfillmentLineDto> {

    return this.getFulfillmentLines$Response(params).pipe(
      map((r: StrictHttpResponse<PageOrderFulfillmentLineDto>) => r.body as PageOrderFulfillmentLineDto)
    );
  }

  /**
   * Path part for operation addFulfillmentLines
   */
  static readonly AddFulfillmentLinesPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}/lines';

  /**
   * Adds lines to the fulfillment with the specified id.
   *
   * Returns the updated order and order lines, and the updated fulfillment and its added lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addFulfillmentLines()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFulfillmentLines$Response(params: {
    orderId: number;
    fulfillmentId: number;
    body: Array<Line>
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.AddFulfillmentLinesPath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
      rb.body(params.body, 'application/json');
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
   * Adds lines to the fulfillment with the specified id.
   *
   * Returns the updated order and order lines, and the updated fulfillment and its added lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addFulfillmentLines$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFulfillmentLines(params: {
    orderId: number;
    fulfillmentId: number;
    body: Array<Line>
  }): Observable<OrderDto> {

    return this.addFulfillmentLines$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation deleteFulfillmentLines
   */
  static readonly DeleteFulfillmentLinesPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}/lines';

  /**
   * Bulk deletes the fulfillment lines with the given ids.
   *
   * Returns the updated order and order lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFulfillmentLines()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteFulfillmentLines$Response(params: {
    orderId: number;
    fulfillmentId: number;
    body: Array<number>
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.DeleteFulfillmentLinesPath, 'delete');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
      rb.body(params.body, 'application/json');
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
   * Bulk deletes the fulfillment lines with the given ids.
   *
   * Returns the updated order and order lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteFulfillmentLines$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteFulfillmentLines(params: {
    orderId: number;
    fulfillmentId: number;
    body: Array<number>
  }): Observable<OrderDto> {

    return this.deleteFulfillmentLines$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation updateFulfillmentLineQuantities
   */
  static readonly UpdateFulfillmentLineQuantitiesPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}/lines';

  /**
   * Bulk updates the reserved quantities of the fulfillment lines with the given ids.
   *
   * Returns the updated order and order lines, and the updated fulfillment and its lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFulfillmentLineQuantities()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFulfillmentLineQuantities$Response(params: {
    orderId: number;
    fulfillmentId: number;
    body: Array<Line>
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.UpdateFulfillmentLineQuantitiesPath, 'patch');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
      rb.body(params.body, 'application/json');
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
   * Bulk updates the reserved quantities of the fulfillment lines with the given ids.
   *
   * Returns the updated order and order lines, and the updated fulfillment and its lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateFulfillmentLineQuantities$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFulfillmentLineQuantities(params: {
    orderId: number;
    fulfillmentId: number;
    body: Array<Line>
  }): Observable<OrderDto> {

    return this.updateFulfillmentLineQuantities$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation completeFulfillment
   */
  static readonly CompleteFulfillmentPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}/complete';

  /**
   * Completes the fulfillment with the specified id.
   *
   * Returns the updated order and order lines, and the completed fulfillment. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeFulfillment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeFulfillment$Response(params: {
    orderId: number;
    fulfillmentId: number;
    body: CompleteOrderFulfillmentForm
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.CompleteFulfillmentPath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
      rb.body(params.body, 'application/json');
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
   * Completes the fulfillment with the specified id.
   *
   * Returns the updated order and order lines, and the completed fulfillment. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `completeFulfillment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeFulfillment(params: {
    orderId: number;
    fulfillmentId: number;
    body: CompleteOrderFulfillmentForm
  }): Observable<OrderDto> {

    return this.completeFulfillment$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation fulfill
   */
  static readonly FulfillPath = '/api/orders/{orderId}/fulfill';

  /**
   * Fulfills the order with the specified id.
   *
   * Returns the updated order. The order must not already be fulfilled, and all of its lines' quantities must be fulfilled. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fulfill()` instead.
   *
   * This method doesn't expect any request body.
   */
  fulfill$Response(params: {
    orderId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.FulfillPath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
   * Fulfills the order with the specified id.
   *
   * Returns the updated order. The order must not already be fulfilled, and all of its lines' quantities must be fulfilled. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `fulfill$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fulfill(params: {
    orderId: number;
  }): Observable<OrderDto> {

    return this.fulfill$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation confirm
   */
  static readonly ConfirmPath = '/api/orders/{orderId}/confirm';

  /**
   * Confirms an order.
   *
   * Returns the updated order. The order must have status CREATED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: {
    orderId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.ConfirmPath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
   * Confirms an order.
   *
   * Returns the updated order. The order must have status CREATED. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: {
    orderId: number;
  }): Observable<OrderDto> {

    return this.confirm$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation cancel
   */
  static readonly CancelPath = '/api/orders/{orderId}/cancel';

  /**
   * Cancels the order with the specified id.
   *
   * Returns the updated order. The order must not already be cancelled. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancel()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancel$Response(params: {
    orderId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.CancelPath, 'post');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
   * Cancels the order with the specified id.
   *
   * Returns the updated order. The order must not already be cancelled. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cancel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancel(params: {
    orderId: number;
  }): Observable<OrderDto> {

    return this.cancel$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation updateTrackingNumber
   */
  static readonly UpdateTrackingNumberPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}/tracking-number';

  /**
   * Updates the tracking number of the completed fulfillment with the specified id.
   *
   * Returns the updated fulfillment. The order must not have the status CANCELLED. The fulfillment must be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTrackingNumber()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTrackingNumber$Response(params: {
    orderId: number;
    fulfillmentId: number;
    body: UpdateOrderFulfillmentTrackingNumberForm
  }): Observable<StrictHttpResponse<OrderFulfillmentDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.UpdateTrackingNumberPath, 'patch');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderFulfillmentDto>;
      })
    );
  }

  /**
   * Updates the tracking number of the completed fulfillment with the specified id.
   *
   * Returns the updated fulfillment. The order must not have the status CANCELLED. The fulfillment must be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateTrackingNumber$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTrackingNumber(params: {
    orderId: number;
    fulfillmentId: number;
    body: UpdateOrderFulfillmentTrackingNumberForm
  }): Observable<OrderFulfillmentDto> {

    return this.updateTrackingNumber$Response(params).pipe(
      map((r: StrictHttpResponse<OrderFulfillmentDto>) => r.body as OrderFulfillmentDto)
    );
  }

  /**
   * Path part for operation getAll
   */
  static readonly GetAllPath = '/api/orders';

  /**
   * Retrieves all orders.
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
    email?: string;
    status?: 'CREATED' | 'CONFIRMED' | 'PROCESSING' | 'PARTIALLY_FULFILLED' | 'FULFILLED' | 'CANCELLED';
  }): Observable<StrictHttpResponse<PageOrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetAllPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
      rb.query('email', params.email, {});
      rb.query('status', params.status, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageOrderDto>;
      })
    );
  }

  /**
   * Retrieves all orders.
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
    email?: string;
    status?: 'CREATED' | 'CONFIRMED' | 'PROCESSING' | 'PARTIALLY_FULFILLED' | 'FULFILLED' | 'CANCELLED';
  }): Observable<PageOrderDto> {

    return this.getAll$Response(params).pipe(
      map((r: StrictHttpResponse<PageOrderDto>) => r.body as PageOrderDto)
    );
  }

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/api/orders/{orderId}';

  /**
   * Retrieves a single order by its id.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: {
    orderId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetPath, 'get');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
   * Retrieves a single order by its id.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: {
    orderId: number;
  }): Observable<OrderDto> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation getLines
   */
  static readonly GetLinesPath = '/api/orders/{orderId}/lines';

  /**
   * Retrieves the lines of the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLines()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLines$Response(params: {
    orderId: number;

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
  }): Observable<StrictHttpResponse<PageOrderLineDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetLinesPath, 'get');
    if (params) {
      rb.path('orderId', params.orderId, {});
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
        return r as StrictHttpResponse<PageOrderLineDto>;
      })
    );
  }

  /**
   * Retrieves the lines of the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLines$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLines(params: {
    orderId: number;

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
  }): Observable<PageOrderLineDto> {

    return this.getLines$Response(params).pipe(
      map((r: StrictHttpResponse<PageOrderLineDto>) => r.body as PageOrderLineDto)
    );
  }

  /**
   * Path part for operation getLine
   */
  static readonly GetLinePath = '/api/orders/{orderId}/lines/{lineId}';

  /**
   * Retrieves a single line by id of the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLine()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLine$Response(params: {
    orderId: number;
    lineId: number;
  }): Observable<StrictHttpResponse<OrderLineDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetLinePath, 'get');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('lineId', params.lineId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderLineDto>;
      })
    );
  }

  /**
   * Retrieves a single line by id of the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLine$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLine(params: {
    orderId: number;
    lineId: number;
  }): Observable<OrderLineDto> {

    return this.getLine$Response(params).pipe(
      map((r: StrictHttpResponse<OrderLineDto>) => r.body as OrderLineDto)
    );
  }

  /**
   * Path part for operation getFulfillment
   */
  static readonly GetFulfillmentPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}';

  /**
   * Retrieves a single fulfillment by id belonging to the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFulfillment()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillment$Response(params: {
    orderId: number;
    fulfillmentId: number;
  }): Observable<StrictHttpResponse<OrderFulfillmentDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetFulfillmentPath, 'get');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderFulfillmentDto>;
      })
    );
  }

  /**
   * Retrieves a single fulfillment by id belonging to the specified order.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFulfillment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillment(params: {
    orderId: number;
    fulfillmentId: number;
  }): Observable<OrderFulfillmentDto> {

    return this.getFulfillment$Response(params).pipe(
      map((r: StrictHttpResponse<OrderFulfillmentDto>) => r.body as OrderFulfillmentDto)
    );
  }

  /**
   * Path part for operation deleteFulfillment
   */
  static readonly DeleteFulfillmentPath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}';

  /**
   * Deletes the fulfillment with the specified id.
   *
   * Returns the updated order and order lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFulfillment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFulfillment$Response(params: {
    orderId: number;
    fulfillmentId: number;
  }): Observable<StrictHttpResponse<OrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.DeleteFulfillmentPath, 'delete');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
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
   * Deletes the fulfillment with the specified id.
   *
   * Returns the updated order and order lines. The order must have status CONFIRMED, PROCESSING, or PARTIALLY_FULFILLED. The fulfillment must not be completed. Requires PROCESS_ORDERS authority (Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteFulfillment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFulfillment(params: {
    orderId: number;
    fulfillmentId: number;
  }): Observable<OrderDto> {

    return this.deleteFulfillment$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDto>) => r.body as OrderDto)
    );
  }

  /**
   * Path part for operation getFulfillmentLine
   */
  static readonly GetFulfillmentLinePath = '/api/orders/{orderId}/fulfillments/{fulfillmentId}/lines/{fulfillmentLineId}';

  /**
   * Retrieves a single line by id of the specified fulfillment.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFulfillmentLine()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillmentLine$Response(params: {
    orderId: number;
    fulfillmentId: number;
    fulfillmentLineId: number;
  }): Observable<StrictHttpResponse<OrderFulfillmentLineDto>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetFulfillmentLinePath, 'get');
    if (params) {
      rb.path('orderId', params.orderId, {});
      rb.path('fulfillmentId', params.fulfillmentId, {});
      rb.path('fulfillmentLineId', params.fulfillmentLineId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderFulfillmentLineDto>;
      })
    );
  }

  /**
   * Retrieves a single line by id of the specified fulfillment.
   *
   * Requires READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFulfillmentLine$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFulfillmentLine(params: {
    orderId: number;
    fulfillmentId: number;
    fulfillmentLineId: number;
  }): Observable<OrderFulfillmentLineDto> {

    return this.getFulfillmentLine$Response(params).pipe(
      map((r: StrictHttpResponse<OrderFulfillmentLineDto>) => r.body as OrderFulfillmentLineDto)
    );
  }

}
