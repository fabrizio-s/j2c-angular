/* tslint:disable */
/* eslint-disable */
export interface CreateProductForm {
  categoryId?: number;
  description?: string;
  digital: boolean;

  /**
   * The id returned after successfully uploading an image
   */
  imageId?: string;
  mass?: number;
  name: string;
  price: number;

  /**
   * Ids of the tags with which to tag the product to be created
   */
  tagIds?: Array<number>;
}
