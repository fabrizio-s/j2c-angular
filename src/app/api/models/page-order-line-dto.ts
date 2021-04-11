/* tslint:disable */
/* eslint-disable */
import { OrderLineDto } from './order-line-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageOrderLineDto {
  content?: Array<OrderLineDto>;
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
