import { OrderDto, OrderFulfillmentDto, OrderLineDto } from "src/app/api/models";

export class SetDetails {
  static readonly type = '[OrderDetails] SetDetails';
  constructor(public payload: { order: OrderDto, lines: OrderLineDto[], fulfillments: OrderFulfillmentDto[] }) { }
}
