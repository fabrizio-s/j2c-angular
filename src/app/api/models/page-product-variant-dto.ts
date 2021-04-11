/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { ProductVariantDto } from './product-variant-dto';
import { Sort } from './sort';
export interface PageProductVariantDto {
  content?: Array<ProductVariantDto>;
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
