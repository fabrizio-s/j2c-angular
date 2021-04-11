/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { ShippingMethodDto } from './shipping-method-dto';
import { Sort } from './sort';
export interface PageShippingMethodDto {
  content?: Array<ShippingMethodDto>;
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
