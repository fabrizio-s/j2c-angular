/* tslint:disable */
/* eslint-disable */
import { OrderFulfillmentLineDto } from './order-fulfillment-line-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageOrderFulfillmentLineDto {
  content?: Array<OrderFulfillmentLineDto>;
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
