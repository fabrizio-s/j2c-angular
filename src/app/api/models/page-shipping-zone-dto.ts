/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { ShippingZoneDto } from './shipping-zone-dto';
import { Sort } from './sort';
export interface PageShippingZoneDto {
  content?: Array<ShippingZoneDto>;
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
