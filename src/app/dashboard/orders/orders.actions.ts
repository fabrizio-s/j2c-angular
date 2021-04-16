import { OrderDto } from "src/app/api/models";

export class Initialize {
  static readonly type = '[Orders] Initialize';
  constructor(public payload: OrderDto[]) { }
}

export class SetOrders {
  static readonly type = '[Orders] SetOrders';
  constructor(public payload: OrderDto[]) { }
}

export class SetPagination {
  static readonly type = '[Orders] SetPagination';
  constructor(public payload: { page: number, totalPages: number }) { }
}
