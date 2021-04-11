/* tslint:disable */
/* eslint-disable */
export interface UpdateProductVariantForm {

  /**
   * A list uploaded image ids
   */
  imagesToAddIds?: Array<string>;

  /**
   * A list variant image ids
   */
  imagesToRemoveIds?: Array<number>;
  mass?: number;
  name?: string;

  /**
   * If provided, this value will be used instead of the parent product's price to calculate the total amount during checkout
   */
  price?: number;
}
