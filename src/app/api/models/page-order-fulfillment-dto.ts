/* tslint:disable */
/* eslint-disable */
import { OrderFulfillmentDto } from './order-fulfillment-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageOrderFulfillmentDto {
  content?: Array<OrderFulfillmentDto>;
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
