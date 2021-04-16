import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetDetails } from './order-details.actions';
import { Injectable } from '@angular/core';
import { OrderDto, OrderFulfillmentDto, OrderLineDto } from 'src/app/api/models';

export interface OrdersStateModel {
  order: OrderDto | undefined;
  lines: OrderLineDto[];
  fulfillments: OrderFulfillmentDto[];
}

@State<OrdersStateModel>({
  name: 'orderDetails',
  defaults: {
    order: undefined,
    lines: [],
    fulfillments: []
  }
})
@Injectable()
export class OrderDetailsState {

  @Selector()
  static order(state: OrdersStateModel): OrderDto | undefined {
    return state.order;
  }

  @Selector()
  static lines(state: OrdersStateModel): OrderLineDto[] {
    return state.lines;
  }

  @Selector()
  static fulfillments(state: OrdersStateModel): OrderFulfillmentDto[] {
    return state.fulfillments;
  }

  @Action(SetDetails)
  setDetails(ctx: StateContext<OrdersStateModel>, action: SetDetails) {
    ctx.patchState({
      order: action.payload.order,
      lines: action.payload.lines,
      fulfillments: action.payload.fulfillments
    });
  }

}
