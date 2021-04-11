/* tslint:disable */
/* eslint-disable */
import { CheckoutDto } from './checkout-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageCheckoutDto {
  content?: Array<CheckoutDto>;
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
