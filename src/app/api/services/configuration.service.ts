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

import { ConfigurationDto } from '../models/configuration-dto';
import { ConfigurationForm } from '../models/configuration-form';


/**
 * Endpoints related to global application configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/api/configuration';

  /**
   * Retrieves global application configuration settings.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params?: {
  }): Observable<StrictHttpResponse<ConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.GetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConfigurationDto>;
      })
    );
  }

  /**
   * Retrieves global application configuration settings.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params?: {
  }): Observable<ConfigurationDto> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigurationDto>) => r.body as ConfigurationDto)
    );
  }

  /**
   * Path part for operation configure
   */
  static readonly ConfigurePath = '/api/configuration';

  /**
   * Change global application configuration settings.
   *
   * Requires CONFIG authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configure()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configure$Response(params: {
    body: ConfigurationForm
  }): Observable<StrictHttpResponse<ConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.ConfigurePath, 'patch');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConfigurationDto>;
      })
    );
  }

  /**
   * Change global application configuration settings.
   *
   * Requires CONFIG authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configure$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configure(params: {
    body: ConfigurationForm
  }): Observable<ConfigurationDto> {

    return this.configure$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigurationDto>) => r.body as ConfigurationDto)
    );
  }

}
