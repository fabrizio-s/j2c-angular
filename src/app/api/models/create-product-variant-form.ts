/* tslint:disable */
/* eslint-disable */
export interface CreateProductVariantForm {

  /**
   * The name to assign to the product's current default variant. Required only if the product's current default variant has no name.
   */
  defaultVariantName?: string;

  /**
   * A list uploaded image ids
   */
  imageIds?: Array<string>;
  mass?: number;
  name: string;

  /**
   * If provided, this value will be used instead of the parent product's price to calculate the total amount during checkout
   */
  price?: number;
}
