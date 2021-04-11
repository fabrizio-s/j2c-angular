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

import { AuthRequest } from '../models/auth-request';
import { UserDto } from '../models/user-dto';


/**
 * Endpoints related to system authentication
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation refresh
   */
  static readonly RefreshPath = '/api/refresh';

  /**
   * Generate a new token by supplying an existing one.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refresh()` instead.
   *
   * This method doesn't expect any request body.
   */
  refresh$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.RefreshPath, 'post');
    if (params) {
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
   * Generate a new token by supplying an existing one.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `refresh$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refresh(params?: {
  }): Observable<void> {

    return this.refresh$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authenticate
   */
  static readonly AuthenticatePath = '/api/authentication';

  /**
   * Submit user credentials to generate a token which can be used to access secured endpoints.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: {

    /**
     * Credentials of the user for whom to generate a token
     */
    body: AuthRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Submit user credentials to generate a token which can be used to access secured endpoints.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: {

    /**
     * Credentials of the user for whom to generate a token
     */
    body: AuthRequest
  }): Observable<void> {

    return this.authenticate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation anonymous
   */
  static readonly AnonymousPath = '/api/anonymous';

  /**
   * Create a new unprivileged anonymous user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `anonymous()` instead.
   *
   * This method doesn't expect any request body.
   */
  anonymous$Response(params?: {
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AnonymousPath, 'post');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * Create a new unprivileged anonymous user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `anonymous$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  anonymous(params?: {
  }): Observable<UserDto> {

    return this.anonymous$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

}
