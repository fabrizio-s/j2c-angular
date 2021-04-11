/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { UserAddressDto } from './user-address-dto';
export interface PageUserAddressDto {
  content?: Array<UserAddressDto>;
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
