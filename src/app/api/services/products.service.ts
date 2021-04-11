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

import { CreateProductCategoryForm } from '../models/create-product-category-form';
import { CreateProductForm } from '../models/create-product-form';
import { CreateProductTagForm } from '../models/create-product-tag-form';
import { CreateProductVariantForm } from '../models/create-product-variant-form';
import { PageProductCategoryDto } from '../models/page-product-category-dto';
import { PageProductDto } from '../models/page-product-dto';
import { PageProductTagDto } from '../models/page-product-tag-dto';
import { PageProductVariantDto } from '../models/page-product-variant-dto';
import { PageProductVariantImageDto } from '../models/page-product-variant-image-dto';
import { ProductCategoryDto } from '../models/product-category-dto';
import { ProductDto } from '../models/product-dto';
import { ProductTagDto } from '../models/product-tag-dto';
import { ProductVariantDto } from '../models/product-variant-dto';
import { ProductVariantImageDto } from '../models/product-variant-image-dto';
import { UpdateProductCategoryForm } from '../models/update-product-category-form';
import { UpdateProductForm } from '../models/update-product-form';
import { UpdateProductTagForm } from '../models/update-product-tag-form';
import { UpdateProductVariantForm } from '../models/update-product-variant-form';


/**
 * Endpoints related to products
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllTags
   */
  static readonly GetAllTagsPath = '/api/tags';

  /**
   * Retrieves all tags.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTags$Response(params?: {

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
  }): Observable<StrictHttpResponse<PageProductTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetAllTagsPath, 'get');
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
        return r as StrictHttpResponse<PageProductTagDto>;
      })
    );
  }

  /**
   * Retrieves all tags.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTags(params?: {

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
  }): Observable<PageProductTagDto> {

    return this.getAllTags$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductTagDto>) => r.body as PageProductTagDto)
    );
  }

  /**
   * Path part for operation createTag
   */
  static readonly CreateTagPath = '/api/tags';

  /**
   * Creates a tag.
   *
   * Returns the created tag.Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag$Response(params: {
    body: CreateProductTagForm
  }): Observable<StrictHttpResponse<ProductTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.CreateTagPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductTagDto>;
      })
    );
  }

  /**
   * Creates a tag.
   *
   * Returns the created tag.Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag(params: {
    body: CreateProductTagForm
  }): Observable<ProductTagDto> {

    return this.createTag$Response(params).pipe(
      map((r: StrictHttpResponse<ProductTagDto>) => r.body as ProductTagDto)
    );
  }

  /**
   * Path part for operation getAll
   */
  static readonly GetAllPath = '/api/products';

  /**
   * Retrieves all products.
   *
   *
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
    digital?: boolean;
    defaultPrice?: number;
    lastUnpublished?: string;
    tagAssociations?: string;
    lastPublished?: string;
    published?: boolean;
    variants?: string;
    defaultVariant?: string;
    name?: string;
    id?: number;
    tag?: string;
    category?: string;
  }): Observable<StrictHttpResponse<PageProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetAllPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
      rb.query('digital', params.digital, {});
      rb.query('defaultPrice', params.defaultPrice, {});
      rb.query('lastUnpublished', params.lastUnpublished, {});
      rb.query('tagAssociations', params.tagAssociations, {});
      rb.query('lastPublished', params.lastPublished, {});
      rb.query('published', params.published, {});
      rb.query('variants', params.variants, {});
      rb.query('defaultVariant', params.defaultVariant, {});
      rb.query('name', params.name, {});
      rb.query('id', params.id, {});
      rb.query('tag', params.tag, {});
      rb.query('category', params.category, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageProductDto>;
      })
    );
  }

  /**
   * Retrieves all products.
   *
   *
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
    digital?: boolean;
    defaultPrice?: number;
    lastUnpublished?: string;
    tagAssociations?: string;
    lastPublished?: string;
    published?: boolean;
    variants?: string;
    defaultVariant?: string;
    name?: string;
    id?: number;
    tag?: string;
    category?: string;
  }): Observable<PageProductDto> {

    return this.getAll$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductDto>) => r.body as PageProductDto)
    );
  }

  /**
   * Path part for operation create
   */
  static readonly CreatePath = '/api/products';

  /**
   * Creates a product and a default variant.
   *
   * Returns the created product and variant. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: {
    body: CreateProductForm
  }): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.CreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * Creates a product and a default variant.
   *
   * Returns the created product and variant. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: {
    body: CreateProductForm
  }): Observable<ProductDto> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation getVariants
   */
  static readonly GetVariantsPath = '/api/products/{productId}/variants';

  /**
   * Retrieves the variants of the product with the specified id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVariants()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariants$Response(params: {
    productId: number;

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
  }): Observable<StrictHttpResponse<PageProductVariantDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetVariantsPath, 'get');
    if (params) {
      rb.path('productId', params.productId, {});
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
        return r as StrictHttpResponse<PageProductVariantDto>;
      })
    );
  }

  /**
   * Retrieves the variants of the product with the specified id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVariants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariants(params: {
    productId: number;

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
  }): Observable<PageProductVariantDto> {

    return this.getVariants$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductVariantDto>) => r.body as PageProductVariantDto)
    );
  }

  /**
   * Path part for operation createVariant
   */
  static readonly CreateVariantPath = '/api/products/{productId}/variants';

  /**
   * Creates a variant of the product with the specified id.
   *
   * Returns the created variant. If the product's default variant has no name, a name for it must be provided. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createVariant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createVariant$Response(params: {
    productId: number;
    body: CreateProductVariantForm
  }): Observable<StrictHttpResponse<ProductVariantDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.CreateVariantPath, 'post');
    if (params) {
      rb.path('productId', params.productId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductVariantDto>;
      })
    );
  }

  /**
   * Creates a variant of the product with the specified id.
   *
   * Returns the created variant. If the product's default variant has no name, a name for it must be provided. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createVariant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createVariant(params: {
    productId: number;
    body: CreateProductVariantForm
  }): Observable<ProductVariantDto> {

    return this.createVariant$Response(params).pipe(
      map((r: StrictHttpResponse<ProductVariantDto>) => r.body as ProductVariantDto)
    );
  }

  /**
   * Path part for operation unpublish
   */
  static readonly UnpublishPath = '/api/products/{productId}/unpublish';

  /**
   * Unpublishes a product.
   *
   * Returns the updated product. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unpublish()` instead.
   *
   * This method doesn't expect any request body.
   */
  unpublish$Response(params: {
    productId: number;
  }): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.UnpublishPath, 'post');
    if (params) {
      rb.path('productId', params.productId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * Unpublishes a product.
   *
   * Returns the updated product. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unpublish$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unpublish(params: {
    productId: number;
  }): Observable<ProductDto> {

    return this.unpublish$Response(params).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation publish
   */
  static readonly PublishPath = '/api/products/{productId}/publish';

  /**
   * Publishes a product.
   *
   * Returns the updated product. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `publish()` instead.
   *
   * This method doesn't expect any request body.
   */
  publish$Response(params: {
    productId: number;
  }): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.PublishPath, 'post');
    if (params) {
      rb.path('productId', params.productId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * Publishes a product.
   *
   * Returns the updated product. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `publish$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  publish(params: {
    productId: number;
  }): Observable<ProductDto> {

    return this.publish$Response(params).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation getAllCategories
   */
  static readonly GetAllCategoriesPath = '/api/categories';

  /**
   * Retrieves all product categories.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories$Response(params?: {

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
  }): Observable<StrictHttpResponse<PageProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetAllCategoriesPath, 'get');
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
        return r as StrictHttpResponse<PageProductCategoryDto>;
      })
    );
  }

  /**
   * Retrieves all product categories.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories(params?: {

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
  }): Observable<PageProductCategoryDto> {

    return this.getAllCategories$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductCategoryDto>) => r.body as PageProductCategoryDto)
    );
  }

  /**
   * Path part for operation createCategory
   */
  static readonly CreateCategoryPath = '/api/categories';

  /**
   * Creates a category.
   *
   * Returns the created category. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory$Response(params: {
    body: CreateProductCategoryForm
  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.CreateCategoryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * Creates a category.
   *
   * Returns the created category. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory(params: {
    body: CreateProductCategoryForm
  }): Observable<ProductCategoryDto> {

    return this.createCategory$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation getSubCategories
   */
  static readonly GetSubCategoriesPath = '/api/categories/{categoryId}/sub-categories';

  /**
   * Retrieves all the sub-categories belonging to the category with the specified id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubCategories$Response(params: {
    categoryId: number;

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
  }): Observable<StrictHttpResponse<PageProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetSubCategoriesPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
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
        return r as StrictHttpResponse<PageProductCategoryDto>;
      })
    );
  }

  /**
   * Retrieves all the sub-categories belonging to the category with the specified id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubCategories(params: {
    categoryId: number;

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
  }): Observable<PageProductCategoryDto> {

    return this.getSubCategories$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductCategoryDto>) => r.body as PageProductCategoryDto)
    );
  }

  /**
   * Path part for operation createSubCategory
   */
  static readonly CreateSubCategoryPath = '/api/categories/{categoryId}/sub-categories';

  /**
   * Creates a sub-category of the specified category.
   *
   * Returns the created sub-category. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSubCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSubCategory$Response(params: {
    categoryId: number;
    body: CreateProductCategoryForm
  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.CreateSubCategoryPath, 'post');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * Creates a sub-category of the specified category.
   *
   * Returns the created sub-category. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createSubCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSubCategory(params: {
    categoryId: number;
    body: CreateProductCategoryForm
  }): Observable<ProductCategoryDto> {

    return this.createSubCategory$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation getTag
   */
  static readonly GetTagPath = '/api/tags/{tagId}';

  /**
   * Retrieves a single tag by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag$Response(params: {
    tagId: number;
  }): Observable<StrictHttpResponse<ProductTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetTagPath, 'get');
    if (params) {
      rb.path('tagId', params.tagId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductTagDto>;
      })
    );
  }

  /**
   * Retrieves a single tag by its id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag(params: {
    tagId: number;
  }): Observable<ProductTagDto> {

    return this.getTag$Response(params).pipe(
      map((r: StrictHttpResponse<ProductTagDto>) => r.body as ProductTagDto)
    );
  }

  /**
   * Path part for operation deleteTag
   */
  static readonly DeleteTagPath = '/api/tags/{tagId}';

  /**
   * Deletes the tag with the specified id.
   *
   * Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTag$Response(params: {
    tagId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.DeleteTagPath, 'delete');
    if (params) {
      rb.path('tagId', params.tagId, {});
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
   * Deletes the tag with the specified id.
   *
   * Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTag(params: {
    tagId: number;
  }): Observable<void> {

    return this.deleteTag$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateTag
   */
  static readonly UpdateTagPath = '/api/tags/{tagId}';

  /**
   * Updates the tag with the specified id.
   *
   * Returns the updated tag.Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTag$Response(params: {
    tagId: number;
    body: UpdateProductTagForm
  }): Observable<StrictHttpResponse<ProductTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.UpdateTagPath, 'patch');
    if (params) {
      rb.path('tagId', params.tagId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductTagDto>;
      })
    );
  }

  /**
   * Updates the tag with the specified id.
   *
   * Returns the updated tag.Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTag(params: {
    tagId: number;
    body: UpdateProductTagForm
  }): Observable<ProductTagDto> {

    return this.updateTag$Response(params).pipe(
      map((r: StrictHttpResponse<ProductTagDto>) => r.body as ProductTagDto)
    );
  }

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/api/products/{productId}';

  /**
   * Retrieves a single product by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: {
    productId: number;
  }): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetPath, 'get');
    if (params) {
      rb.path('productId', params.productId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * Retrieves a single product by its id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: {
    productId: number;
  }): Observable<ProductDto> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation delete
   */
  static readonly DeletePath = '/api/products/{productId}';

  /**
   * Deletes a product.
   *
   * Also deletes all of the product's variants. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: {
    productId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.DeletePath, 'delete');
    if (params) {
      rb.path('productId', params.productId, {});
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
   * Deletes a product.
   *
   * Also deletes all of the product's variants. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: {
    productId: number;
  }): Observable<void> {

    return this.delete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update
   */
  static readonly UpdatePath = '/api/products/{productId}';

  /**
   * Updates a product.
   *
   * Returns the updated product. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: {
    productId: number;
    body: UpdateProductForm
  }): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.UpdatePath, 'patch');
    if (params) {
      rb.path('productId', params.productId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * Updates a product.
   *
   * Returns the updated product. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: {
    productId: number;
    body: UpdateProductForm
  }): Observable<ProductDto> {

    return this.update$Response(params).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation getVariant
   */
  static readonly GetVariantPath = '/api/products/{productId}/variants/{variantId}';

  /**
   * Retrieves a single variant by id belonging to the specified product.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVariant()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariant$Response(params: {
    productId: number;
    variantId: number;
  }): Observable<StrictHttpResponse<ProductVariantDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetVariantPath, 'get');
    if (params) {
      rb.path('productId', params.productId, {});
      rb.path('variantId', params.variantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductVariantDto>;
      })
    );
  }

  /**
   * Retrieves a single variant by id belonging to the specified product.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVariant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariant(params: {
    productId: number;
    variantId: number;
  }): Observable<ProductVariantDto> {

    return this.getVariant$Response(params).pipe(
      map((r: StrictHttpResponse<ProductVariantDto>) => r.body as ProductVariantDto)
    );
  }

  /**
   * Path part for operation deleteVariant
   */
  static readonly DeleteVariantPath = '/api/products/{productId}/variants/{variantId}';

  /**
   * Deletes the variant by id belonging to the specified product.
   *
   * Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteVariant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVariant$Response(params: {
    productId: number;
    variantId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.DeleteVariantPath, 'delete');
    if (params) {
      rb.path('productId', params.productId, {});
      rb.path('variantId', params.variantId, {});
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
   * Deletes the variant by id belonging to the specified product.
   *
   * Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteVariant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVariant(params: {
    productId: number;
    variantId: number;
  }): Observable<void> {

    return this.deleteVariant$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateVariant
   */
  static readonly UpdateVariantPath = '/api/products/{productId}/variants/{variantId}';

  /**
   * Updates the variant by id of the specified product.
   *
   * Returns the updated variant. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateVariant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVariant$Response(params: {
    productId: number;
    variantId: number;
    body: UpdateProductVariantForm
  }): Observable<StrictHttpResponse<ProductVariantDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.UpdateVariantPath, 'patch');
    if (params) {
      rb.path('productId', params.productId, {});
      rb.path('variantId', params.variantId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductVariantDto>;
      })
    );
  }

  /**
   * Updates the variant by id of the specified product.
   *
   * Returns the updated variant. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateVariant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVariant(params: {
    productId: number;
    variantId: number;
    body: UpdateProductVariantForm
  }): Observable<ProductVariantDto> {

    return this.updateVariant$Response(params).pipe(
      map((r: StrictHttpResponse<ProductVariantDto>) => r.body as ProductVariantDto)
    );
  }

  /**
   * Path part for operation getCategory
   */
  static readonly GetCategoryPath = '/api/categories/{categoryId}';

  /**
   * Retrieves a single category by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory$Response(params: {
    categoryId: number;
  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetCategoryPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * Retrieves a single category by its id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory(params: {
    categoryId: number;
  }): Observable<ProductCategoryDto> {

    return this.getCategory$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation deleteCategory
   */
  static readonly DeleteCategoryPath = '/api/categories/{categoryId}';

  /**
   * Deletes the category with the specified id and all of its.
   *
   * Also deletes all of the category's sub-categories.Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory$Response(params: {
    categoryId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.DeleteCategoryPath, 'delete');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
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
   * Deletes the category with the specified id and all of its.
   *
   * Also deletes all of the category's sub-categories.Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory(params: {
    categoryId: number;
  }): Observable<void> {

    return this.deleteCategory$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateCategory
   */
  static readonly UpdateCategoryPath = '/api/categories/{categoryId}';

  /**
   * Updates the category with the specified id.
   *
   * Returns the updated category. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory$Response(params: {
    categoryId: number;
    body: UpdateProductCategoryForm
  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.UpdateCategoryPath, 'patch');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * Updates the category with the specified id.
   *
   * Returns the updated category. Requires WRITE_PRODUCTS authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory(params: {
    categoryId: number;
    body: UpdateProductCategoryForm
  }): Observable<ProductCategoryDto> {

    return this.updateCategory$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation getVariantImages
   */
  static readonly GetVariantImagesPath = '/api/products/{productId}/variants/{variantId}/images';

  /**
   * Retrieves the images belonging to the specified product variant.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVariantImages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariantImages$Response(params: {
    productId: number;
    variantId: number;

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
  }): Observable<StrictHttpResponse<PageProductVariantImageDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetVariantImagesPath, 'get');
    if (params) {
      rb.path('productId', params.productId, {});
      rb.path('variantId', params.variantId, {});
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
        return r as StrictHttpResponse<PageProductVariantImageDto>;
      })
    );
  }

  /**
   * Retrieves the images belonging to the specified product variant.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVariantImages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariantImages(params: {
    productId: number;
    variantId: number;

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
  }): Observable<PageProductVariantImageDto> {

    return this.getVariantImages$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductVariantImageDto>) => r.body as PageProductVariantImageDto)
    );
  }

  /**
   * Path part for operation getVariantImage
   */
  static readonly GetVariantImagePath = '/api/products/{productId}/variants/{variantId}/images/{variantImageId}';

  /**
   * Retrieves a single image by id belonging to the specified product variant.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVariantImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariantImage$Response(params: {
    productId: number;
    variantId: number;
    variantImageId: number;
  }): Observable<StrictHttpResponse<ProductVariantImageDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetVariantImagePath, 'get');
    if (params) {
      rb.path('productId', params.productId, {});
      rb.path('variantId', params.variantId, {});
      rb.path('variantImageId', params.variantImageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductVariantImageDto>;
      })
    );
  }

  /**
   * Retrieves a single image by id belonging to the specified product variant.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVariantImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVariantImage(params: {
    productId: number;
    variantId: number;
    variantImageId: number;
  }): Observable<ProductVariantImageDto> {

    return this.getVariantImage$Response(params).pipe(
      map((r: StrictHttpResponse<ProductVariantImageDto>) => r.body as ProductVariantImageDto)
    );
  }

  /**
   * Path part for operation getProductTags
   */
  static readonly GetProductTagsPath = '/api/products/{productId}/tags';

  /**
   * Retrieves the specified product's tags.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductTags$Response(params: {
    productId: number;

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
  }): Observable<StrictHttpResponse<PageProductTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductsService.GetProductTagsPath, 'get');
    if (params) {
      rb.path('productId', params.productId, {});
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
        return r as StrictHttpResponse<PageProductTagDto>;
      })
    );
  }

  /**
   * Retrieves the specified product's tags.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProductTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductTags(params: {
    productId: number;

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
  }): Observable<PageProductTagDto> {

    return this.getProductTags$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductTagDto>) => r.body as PageProductTagDto)
    );
  }

}
