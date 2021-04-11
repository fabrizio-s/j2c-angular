/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { ProductVariantImageDto } from './product-variant-image-dto';
import { Sort } from './sort';
export interface PageProductVariantImageDto {
  content?: Array<ProductVariantImageDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
