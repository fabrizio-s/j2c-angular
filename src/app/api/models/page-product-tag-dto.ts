/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { ProductTagDto } from './product-tag-dto';
import { Sort } from './sort';
export interface PageProductTagDto {
  content?: Array<ProductTagDto>;
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
