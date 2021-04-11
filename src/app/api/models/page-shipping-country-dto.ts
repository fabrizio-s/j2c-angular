/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { ShippingCountryDto } from './shipping-country-dto';
import { Sort } from './sort';
export interface PageShippingCountryDto {
  content?: Array<ShippingCountryDto>;
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
