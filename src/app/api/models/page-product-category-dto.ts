/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { ProductCategoryDto } from './product-category-dto';
import { Sort } from './sort';
export interface PageProductCategoryDto {
  content?: Array<ProductCategoryDto>;
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
