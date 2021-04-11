/* tslint:disable */
/* eslint-disable */
export interface UpdateProductForm {
  categoryId?: number;
  defaultVariantId?: number;
  description?: string;
  name?: string;

  /**
   * The id returned after successfully uploading an image
   */
  newImageId?: string;
  price?: number;

  /**
   * List of ids of the tags to tag the product with
   */
  tagsToAdd?: Array<number>;

  /**
   * List of ids of the tags to remove from this product
   */
  tagsToRemove?: Array<number>;
}
