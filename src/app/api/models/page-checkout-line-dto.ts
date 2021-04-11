/* tslint:disable */
/* eslint-disable */
import { CheckoutLineDto } from './checkout-line-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageCheckoutLineDto {
  content?: Array<CheckoutLineDto>;
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
