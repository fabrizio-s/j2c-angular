import { OrderFulfillmentDto, OrderFulfillmentLineDto, OrderLineDto } from "src/app/api/models";

export class SetDetails {
  static readonly type = '[FulfillmentDetails] SetDetails';
  constructor(public payload: { fulfillment: OrderFulfillmentDto, lines: { orderLine: OrderLineDto, fulfillmentLine: OrderFulfillmentLineDto }[] }) { }
}
