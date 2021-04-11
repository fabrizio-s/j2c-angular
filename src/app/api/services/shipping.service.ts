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

import { CreateShippingMethodForm } from '../models/create-shipping-method-form';
import { CreateShippingZoneForm } from '../models/create-shipping-zone-form';
import { PageCountryCode } from '../models/page-country-code';
import { PageShippingCountryDto } from '../models/page-shipping-country-dto';
import { PageShippingMethodDto } from '../models/page-shipping-method-dto';
import { PageShippingZoneDto } from '../models/page-shipping-zone-dto';
import { ShippingCountryDto } from '../models/shipping-country-dto';
import { ShippingMethodDto } from '../models/shipping-method-dto';
import { ShippingZoneDto } from '../models/shipping-zone-dto';
import { UpdateShippingMethodForm } from '../models/update-shipping-method-form';
import { UpdateShippingZoneForm } from '../models/update-shipping-zone-form';


/**
 * Endpoints related to shipping
 */
@Injectable({
  providedIn: 'root',
})
export class ShippingService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllZones
   */
  static readonly GetAllZonesPath = '/api/shipping-zones';

  /**
   * Retrieves all shipping zones.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllZones()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllZones$Response(params?: {

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
  }): Observable<StrictHttpResponse<PageShippingZoneDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.GetAllZonesPath, 'get');
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
        return r as StrictHttpResponse<PageShippingZoneDto>;
      })
    );
  }

  /**
   * Retrieves all shipping zones.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllZones$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllZones(params?: {

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
  }): Observable<PageShippingZoneDto> {

    return this.getAllZones$Response(params).pipe(
      map((r: StrictHttpResponse<PageShippingZoneDto>) => r.body as PageShippingZoneDto)
    );
  }

  /**
   * Path part for operation createZone
   */
  static readonly CreateZonePath = '/api/shipping-zones';

  /**
   * Creates a shipping zone.
   *
   * Returns the created shipping zone. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createZone()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createZone$Response(params: {
    body: CreateShippingZoneForm
  }): Observable<StrictHttpResponse<ShippingZoneDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.CreateZonePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ShippingZoneDto>;
      })
    );
  }

  /**
   * Creates a shipping zone.
   *
   * Returns the created shipping zone. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createZone$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createZone(params: {
    body: CreateShippingZoneForm
  }): Observable<ShippingZoneDto> {

    return this.createZone$Response(params).pipe(
      map((r: StrictHttpResponse<ShippingZoneDto>) => r.body as ShippingZoneDto)
    );
  }

  /**
   * Path part for operation getMethods
   */
  static readonly GetMethodsPath = '/api/shipping-zones/{zoneId}/methods';

  /**
   * Retrieves the shipping methods belonging to the specified shipping zone.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMethods()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMethods$Response(params: {
    zoneId: number;
    checkout?: number;

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
  }): Observable<StrictHttpResponse<PageShippingMethodDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.GetMethodsPath, 'get');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
      rb.query('checkout', params.checkout, {});
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
        return r as StrictHttpResponse<PageShippingMethodDto>;
      })
    );
  }

  /**
   * Retrieves the shipping methods belonging to the specified shipping zone.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMethods$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMethods(params: {
    zoneId: number;
    checkout?: number;

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
  }): Observable<PageShippingMethodDto> {

    return this.getMethods$Response(params).pipe(
      map((r: StrictHttpResponse<PageShippingMethodDto>) => r.body as PageShippingMethodDto)
    );
  }

  /**
   * Path part for operation createMethod
   */
  static readonly CreateMethodPath = '/api/shipping-zones/{zoneId}/methods';

  /**
   * Creates a shipping method for the specified shipping zone.
   *
   * Returns the created shipping method. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMethod()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMethod$Response(params: {
    zoneId: number;
    body: CreateShippingMethodForm
  }): Observable<StrictHttpResponse<ShippingMethodDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.CreateMethodPath, 'post');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ShippingMethodDto>;
      })
    );
  }

  /**
   * Creates a shipping method for the specified shipping zone.
   *
   * Returns the created shipping method. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createMethod$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMethod(params: {
    zoneId: number;
    body: CreateShippingMethodForm
  }): Observable<ShippingMethodDto> {

    return this.createMethod$Response(params).pipe(
      map((r: StrictHttpResponse<ShippingMethodDto>) => r.body as ShippingMethodDto)
    );
  }

  /**
   * Path part for operation getZone
   */
  static readonly GetZonePath = '/api/shipping-zones/{zoneId}';

  /**
   * Retrieves a single shipping zone by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getZone()` instead.
   *
   * This method doesn't expect any request body.
   */
  getZone$Response(params: {
    zoneId: number;
  }): Observable<StrictHttpResponse<ShippingZoneDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.GetZonePath, 'get');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ShippingZoneDto>;
      })
    );
  }

  /**
   * Retrieves a single shipping zone by its id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getZone$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getZone(params: {
    zoneId: number;
  }): Observable<ShippingZoneDto> {

    return this.getZone$Response(params).pipe(
      map((r: StrictHttpResponse<ShippingZoneDto>) => r.body as ShippingZoneDto)
    );
  }

  /**
   * Path part for operation deleteZone
   */
  static readonly DeleteZonePath = '/api/shipping-zones/{zoneId}';

  /**
   * Deletes the shipping zone with the specified id.
   *
   * Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteZone()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteZone$Response(params: {
    zoneId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.DeleteZonePath, 'delete');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
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
   * Deletes the shipping zone with the specified id.
   *
   * Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteZone$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteZone(params: {
    zoneId: number;
  }): Observable<void> {

    return this.deleteZone$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateZone
   */
  static readonly UpdateZonePath = '/api/shipping-zones/{zoneId}';

  /**
   * Updates the shipping zone with the specified id.
   *
   * Returns the updated shipping zone. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateZone()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateZone$Response(params: {
    zoneId: number;
    body: UpdateShippingZoneForm
  }): Observable<StrictHttpResponse<ShippingZoneDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.UpdateZonePath, 'patch');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ShippingZoneDto>;
      })
    );
  }

  /**
   * Updates the shipping zone with the specified id.
   *
   * Returns the updated shipping zone. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateZone$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateZone(params: {
    zoneId: number;
    body: UpdateShippingZoneForm
  }): Observable<ShippingZoneDto> {

    return this.updateZone$Response(params).pipe(
      map((r: StrictHttpResponse<ShippingZoneDto>) => r.body as ShippingZoneDto)
    );
  }

  /**
   * Path part for operation getMethod
   */
  static readonly GetMethodPath = '/api/shipping-zones/{zoneId}/methods/{methodId}';

  /**
   * Retrieves a single shipping method belonging to the specified shipping zone.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMethod$Response(params: {
    zoneId: number;
    methodId: number;
  }): Observable<StrictHttpResponse<ShippingMethodDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.GetMethodPath, 'get');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
      rb.path('methodId', params.methodId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ShippingMethodDto>;
      })
    );
  }

  /**
   * Retrieves a single shipping method belonging to the specified shipping zone.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMethod(params: {
    zoneId: number;
    methodId: number;
  }): Observable<ShippingMethodDto> {

    return this.getMethod$Response(params).pipe(
      map((r: StrictHttpResponse<ShippingMethodDto>) => r.body as ShippingMethodDto)
    );
  }

  /**
   * Path part for operation deleteMethod
   */
  static readonly DeleteMethodPath = '/api/shipping-zones/{zoneId}/methods/{methodId}';

  /**
   * Deletes the shipping method with the specified id.
   *
   * Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMethod$Response(params: {
    zoneId: number;
    methodId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.DeleteMethodPath, 'delete');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
      rb.path('methodId', params.methodId, {});
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
   * Deletes the shipping method with the specified id.
   *
   * Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMethod(params: {
    zoneId: number;
    methodId: number;
  }): Observable<void> {

    return this.deleteMethod$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateMethod
   */
  static readonly UpdateMethodPath = '/api/shipping-zones/{zoneId}/methods/{methodId}';

  /**
   * Updates the shipping method with the specified id.
   *
   * Returns the updated shipping method. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMethod()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMethod$Response(params: {
    zoneId: number;
    methodId: number;
    body: UpdateShippingMethodForm
  }): Observable<StrictHttpResponse<ShippingMethodDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.UpdateMethodPath, 'patch');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
      rb.path('methodId', params.methodId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ShippingMethodDto>;
      })
    );
  }

  /**
   * Updates the shipping method with the specified id.
   *
   * Returns the updated shipping method. Requires WRITE_SHIPPING authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateMethod$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMethod(params: {
    zoneId: number;
    methodId: number;
    body: UpdateShippingMethodForm
  }): Observable<ShippingMethodDto> {

    return this.updateMethod$Response(params).pipe(
      map((r: StrictHttpResponse<ShippingMethodDto>) => r.body as ShippingMethodDto)
    );
  }

  /**
   * Path part for operation getZoneCountries
   */
  static readonly GetZoneCountriesPath = '/api/shipping-zones/{zoneId}/countries';

  /**
   * Retrieves the countries assigned to the shipping zone with the specified id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getZoneCountries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getZoneCountries$Response(params: {
    zoneId: number;

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
  }): Observable<StrictHttpResponse<PageCountryCode>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.GetZoneCountriesPath, 'get');
    if (params) {
      rb.path('zoneId', params.zoneId, {});
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
        return r as StrictHttpResponse<PageCountryCode>;
      })
    );
  }

  /**
   * Retrieves the countries assigned to the shipping zone with the specified id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getZoneCountries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getZoneCountries(params: {
    zoneId: number;

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
  }): Observable<PageCountryCode> {

    return this.getZoneCountries$Response(params).pipe(
      map((r: StrictHttpResponse<PageCountryCode>) => r.body as PageCountryCode)
    );
  }

  /**
   * Path part for operation getAllCountries
   */
  static readonly GetAllCountriesPath = '/api/shipping-countries';

  /**
   * Retrieves all supported shipping countries.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCountries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCountries$Response(params?: {
    unused?: boolean;

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
  }): Observable<StrictHttpResponse<PageShippingCountryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.GetAllCountriesPath, 'get');
    if (params) {
      rb.query('unused', params.unused, {});
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
        return r as StrictHttpResponse<PageShippingCountryDto>;
      })
    );
  }

  /**
   * Retrieves all supported shipping countries.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllCountries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCountries(params?: {
    unused?: boolean;

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
  }): Observable<PageShippingCountryDto> {

    return this.getAllCountries$Response(params).pipe(
      map((r: StrictHttpResponse<PageShippingCountryDto>) => r.body as PageShippingCountryDto)
    );
  }

  /**
   * Path part for operation getCountry
   */
  static readonly GetCountryPath = '/api/shipping-countries/{code}';

  /**
   * Retrieves a single shipping country by its country code.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCountry()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountry$Response(params: {
    code: 'UNDEFINED' | 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AN' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BU' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CP' | 'CR' | 'CS' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DG' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EA' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'EU' | 'EZ' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'FX' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'IC' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NT' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SF' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SU' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TA' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TP' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UK' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'YU' | 'ZA' | 'ZM' | 'ZR' | 'ZW';
  }): Observable<StrictHttpResponse<ShippingCountryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ShippingService.GetCountryPath, 'get');
    if (params) {
      rb.path('code', params.code, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ShippingCountryDto>;
      })
    );
  }

  /**
   * Retrieves a single shipping country by its country code.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCountry$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountry(params: {
    code: 'UNDEFINED' | 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AN' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BU' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CP' | 'CR' | 'CS' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DG' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EA' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'EU' | 'EZ' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'FX' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'IC' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NT' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SF' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SU' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TA' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TP' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UK' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'YU' | 'ZA' | 'ZM' | 'ZR' | 'ZW';
  }): Observable<ShippingCountryDto> {

    return this.getCountry$Response(params).pipe(
      map((r: StrictHttpResponse<ShippingCountryDto>) => r.body as ShippingCountryDto)
    );
  }

}
