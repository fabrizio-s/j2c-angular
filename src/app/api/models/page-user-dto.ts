/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { UserDto } from './user-dto';
export interface PageUserDto {
  content?: Array<UserDto>;
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
