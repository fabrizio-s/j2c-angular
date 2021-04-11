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

import { UploadedImageDto } from '../models/uploaded-image-dto';


/**
 * Endpoints related to image upload
 */
@Injectable({
  providedIn: 'root',
})
export class ImagesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation upload
   */
  static readonly UploadPath = '/api/images';

  /**
   * Upload an image.
   *
   * Returns the id of the created resource. PNG and JPG are the only valid formats. If the image has already been uploaded, the same id will be returned. Requires WRITE_IMAGES authority (Admin).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `upload()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  upload$Response(params?: {
    body?: { 'file': Blob }
  }): Observable<StrictHttpResponse<UploadedImageDto>> {

    const rb = new RequestBuilder(this.rootUrl, ImagesService.UploadPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UploadedImageDto>;
      })
    );
  }

  /**
   * Upload an image.
   *
   * Returns the id of the created resource. PNG and JPG are the only valid formats. If the image has already been uploaded, the same id will be returned. Requires WRITE_IMAGES authority (Admin).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `upload$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  upload(params?: {
    body?: { 'file': Blob }
  }): Observable<UploadedImageDto> {

    return this.upload$Response(params).pipe(
      map((r: StrictHttpResponse<UploadedImageDto>) => r.body as UploadedImageDto)
    );
  }

}
