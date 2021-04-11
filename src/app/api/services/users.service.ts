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

import { ChangeUserEmailForm } from '../models/change-user-email-form';
import { ChangeUserPasswordForm } from '../models/change-user-password-form';
import { CreateAddressForm } from '../models/create-address-form';
import { CreateUserForm } from '../models/create-user-form';
import { PageOrderDto } from '../models/page-order-dto';
import { PageOrderLineDto } from '../models/page-order-line-dto';
import { PageUserAddressDto } from '../models/page-user-address-dto';
import { PageUserDto } from '../models/page-user-dto';
import { PaymentMethodDto } from '../models/payment-method-dto';
import { SignUpForm } from '../models/sign-up-form';
import { UpdateAddressForm } from '../models/update-address-form';
import { UpdateUserForm } from '../models/update-user-form';
import { UserAddressDto } from '../models/user-address-dto';
import { UserDto } from '../models/user-dto';
import { VerifyUserForm } from '../models/verify-user-form';


/**
 * Endpoints related to system users
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation verify
   */
  static readonly VerifyPath = '/api/verify';

  /**
   * Verifies the user's email.
   *
   * Returns the updated user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verify()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verify$Response(params: {
    body: VerifyUserForm
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.VerifyPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Verifies the user's email.
   *
   * Returns the updated user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `verify$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verify(params: {
    body: VerifyUserForm
  }): Observable<UserDto> {

    return this.verify$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation getAll
   */
  static readonly GetAllPath = '/api/users';

  /**
   * Retrieves all users.
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
  }): Observable<StrictHttpResponse<PageUserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.GetAllPath, 'get');
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
        return r as StrictHttpResponse<PageUserDto>;
      })
    );
  }

  /**
   * Retrieves all users.
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
  }): Observable<PageUserDto> {

    return this.getAll$Response(params).pipe(
      map((r: StrictHttpResponse<PageUserDto>) => r.body as PageUserDto)
    );
  }

  /**
   * Path part for operation create
   */
  static readonly CreatePath = '/api/users';

  /**
   * Creates a user.
   *
   * Returns the created user.The email must be unique.Requires WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: {
    body: CreateUserForm
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.CreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Creates a user.
   *
   * Returns the created user.The email must be unique.Requires WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: {
    body: CreateUserForm
  }): Observable<UserDto> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation emailExists
   */
  static readonly EmailExistsPath = '/api/users';

  /**
   * Checks whether a user with the specified email already exists.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `emailExists()` instead.
   *
   * This method doesn't expect any request body.
   */
  emailExists$Response(params: {
    email: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.EmailExistsPath, 'head');
    if (params) {
      rb.query('email', params.email, {});
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
   * Checks whether a user with the specified email already exists.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `emailExists$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  emailExists(params: {
    email: string;
  }): Observable<void> {

    return this.emailExists$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAddresses
   */
  static readonly GetAddressesPath = '/api/users/{userId}/addresses';

  /**
   * Retrieves the addresses belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAddresses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddresses$Response(params: {
    userId: number;

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
  }): Observable<StrictHttpResponse<PageUserAddressDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.GetAddressesPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
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
        return r as StrictHttpResponse<PageUserAddressDto>;
      })
    );
  }

  /**
   * Retrieves the addresses belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAddresses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddresses(params: {
    userId: number;

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
  }): Observable<PageUserAddressDto> {

    return this.getAddresses$Response(params).pipe(
      map((r: StrictHttpResponse<PageUserAddressDto>) => r.body as PageUserAddressDto)
    );
  }

  /**
   * Path part for operation createAddress
   */
  static readonly CreateAddressPath = '/api/users/{userId}/addresses';

  /**
   * Creates an address for the user with the specified id.
   *
   * Returns the created address.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAddress$Response(params: {
    userId: number;
    body: CreateAddressForm
  }): Observable<StrictHttpResponse<UserAddressDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.CreateAddressPath, 'post');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserAddressDto>;
      })
    );
  }

  /**
   * Creates an address for the user with the specified id.
   *
   * Returns the created address.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAddress(params: {
    userId: number;
    body: CreateAddressForm
  }): Observable<UserAddressDto> {

    return this.createAddress$Response(params).pipe(
      map((r: StrictHttpResponse<UserAddressDto>) => r.body as UserAddressDto)
    );
  }

  /**
   * Path part for operation signUp
   */
  static readonly SignUpPath = '/api/signup';

  /**
   * Creates a user with Customer privileges.
   *
   * Returns the created user.The email must be unique.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signUp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp$Response(params: {
    body: SignUpForm
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.SignUpPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Creates a user with Customer privileges.
   *
   * Returns the created user.The email must be unique.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `signUp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp(params: {
    body: SignUpForm
  }): Observable<UserDto> {

    return this.signUp$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/api/users/{userId}';

  /**
   * Retrieves a single user by id.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.GetPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
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
   * Retrieves a single user by id.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: {
    userId: number;
  }): Observable<UserDto> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation delete
   */
  static readonly DeletePath = '/api/users/{userId}';

  /**
   * Deletes the user with the specified id.
   *
   * Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.DeletePath, 'delete');
    if (params) {
      rb.path('userId', params.userId, {});
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
   * Deletes the user with the specified id.
   *
   * Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: {
    userId: number;
  }): Observable<void> {

    return this.delete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update
   */
  static readonly UpdatePath = '/api/users/{userId}';

  /**
   * Updates the user with the specified id.
   *
   * Returns the updated user.The email must be unique.Requires WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: {
    userId: number;
    body: UpdateUserForm
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UpdatePath, 'patch');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.body(params.body, 'application/json');
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
   * Updates the user with the specified id.
   *
   * Returns the updated user.The email must be unique.Requires WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: {
    userId: number;
    body: UpdateUserForm
  }): Observable<UserDto> {

    return this.update$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation changePassword
   */
  static readonly ChangePasswordPath = '/api/users/{userId}/password';

  /**
   * Changes the password of the user with the specified id.
   *
   * Returns the updated user.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: {
    userId: number;
    body: ChangeUserPasswordForm
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ChangePasswordPath, 'patch');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.body(params.body, 'application/json');
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
   * Changes the password of the user with the specified id.
   *
   * Returns the updated user.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: {
    userId: number;
    body: ChangeUserPasswordForm
  }): Observable<UserDto> {

    return this.changePassword$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation changeEmail
   */
  static readonly ChangeEmailPath = '/api/users/{userId}/email';

  /**
   * Changes the email of the user with the specified id.
   *
   * Returns the updated user.The email must be unique.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeEmail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeEmail$Response(params: {
    userId: number;
    body: ChangeUserEmailForm
  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ChangeEmailPath, 'patch');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.body(params.body, 'application/json');
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
   * Changes the email of the user with the specified id.
   *
   * Returns the updated user.The email must be unique.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changeEmail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeEmail(params: {
    userId: number;
    body: ChangeUserEmailForm
  }): Observable<UserDto> {

    return this.changeEmail$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation getAddress
   */
  static readonly GetAddressPath = '/api/users/{userId}/addresses/{addressId}';

  /**
   * Retrieves a single address belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAddress()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddress$Response(params: {
    userId: number;
    addressId: number;
  }): Observable<StrictHttpResponse<UserAddressDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.GetAddressPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('addressId', params.addressId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserAddressDto>;
      })
    );
  }

  /**
   * Retrieves a single address belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAddress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddress(params: {
    userId: number;
    addressId: number;
  }): Observable<UserAddressDto> {

    return this.getAddress$Response(params).pipe(
      map((r: StrictHttpResponse<UserAddressDto>) => r.body as UserAddressDto)
    );
  }

  /**
   * Path part for operation deleteAddress
   */
  static readonly DeleteAddressPath = '/api/users/{userId}/addresses/{addressId}';

  /**
   * Deletes the address by id for the specified user.
   *
   * Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAddress()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAddress$Response(params: {
    userId: number;
    addressId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.DeleteAddressPath, 'delete');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('addressId', params.addressId, {});
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
   * Deletes the address by id for the specified user.
   *
   * Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAddress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAddress(params: {
    userId: number;
    addressId: number;
  }): Observable<void> {

    return this.deleteAddress$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateAddress
   */
  static readonly UpdateAddressPath = '/api/users/{userId}/addresses/{addressId}';

  /**
   * Updates the address by id for the specified user.
   *
   * Returns the updated address.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress$Response(params: {
    userId: number;
    addressId: number;
    body: UpdateAddressForm
  }): Observable<StrictHttpResponse<UserAddressDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UpdateAddressPath, 'patch');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('addressId', params.addressId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserAddressDto>;
      })
    );
  }

  /**
   * Updates the address by id for the specified user.
   *
   * Returns the updated address.Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress(params: {
    userId: number;
    addressId: number;
    body: UpdateAddressForm
  }): Observable<UserAddressDto> {

    return this.updateAddress$Response(params).pipe(
      map((r: StrictHttpResponse<UserAddressDto>) => r.body as UserAddressDto)
    );
  }

  /**
   * Path part for operation getPaymentMethods
   */
  static readonly GetPaymentMethodsPath = '/api/users/{userId}/payment-methods';

  /**
   * Retrieves the payment methods belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentMethods()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentMethods$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<Array<PaymentMethodDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.GetPaymentMethodsPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PaymentMethodDto>>;
      })
    );
  }

  /**
   * Retrieves the payment methods belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPaymentMethods$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentMethods(params: {
    userId: number;
  }): Observable<Array<PaymentMethodDto>> {

    return this.getPaymentMethods$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PaymentMethodDto>>) => r.body as Array<PaymentMethodDto>)
    );
  }

  /**
   * Path part for operation getOrders
   */
  static readonly GetOrdersPath = '/api/users/{userId}/orders';

  /**
   * Retrieves the orders belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders$Response(params: {
    userId: number;

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
  }): Observable<StrictHttpResponse<PageOrderDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.GetOrdersPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
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
        return r as StrictHttpResponse<PageOrderDto>;
      })
    );
  }

  /**
   * Retrieves the orders belonging to the specified user.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders(params: {
    userId: number;

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
  }): Observable<PageOrderDto> {

    return this.getOrders$Response(params).pipe(
      map((r: StrictHttpResponse<PageOrderDto>) => r.body as PageOrderDto)
    );
  }

  /**
   * Path part for operation getOrderLines
   */
  static readonly GetOrderLinesPath = '/api/users/{userId}/orders/{orderId}/lines';

  /**
   * Retrieves the order lines belonging to the specified user's order.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderLines()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderLines$Response(params: {
    userId: number;
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

    const rb = new RequestBuilder(this.rootUrl, UsersService.GetOrderLinesPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
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
   * Retrieves the order lines belonging to the specified user's order.
   *
   * Requires ownership of the resource or READ_ACCESS authority (Viewer, Staff, Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrderLines$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderLines(params: {
    userId: number;
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

    return this.getOrderLines$Response(params).pipe(
      map((r: StrictHttpResponse<PageOrderLineDto>) => r.body as PageOrderLineDto)
    );
  }

  /**
   * Path part for operation deletePaymentMethod
   */
  static readonly DeletePaymentMethodPath = '/api/users/{userId}/payment-methods/{paymentMethodId}';

  /**
   * Deletes the payment method by id for the specified user.
   *
   * Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePaymentMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePaymentMethod$Response(params: {
    userId: number;
    paymentMethodId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.DeletePaymentMethodPath, 'delete');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('paymentMethodId', params.paymentMethodId, {});
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
   * Deletes the payment method by id for the specified user.
   *
   * Requires ownership of the resource or WRITE_USERS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePaymentMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePaymentMethod(params: {
    userId: number;
    paymentMethodId: string;
  }): Observable<void> {

    return this.deletePaymentMethod$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
