/* tslint:disable */
/* eslint-disable */
import { OrderDto } from './order-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageOrderDto {
  content?: Array<OrderDto>;
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
