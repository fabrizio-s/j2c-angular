import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetDetails } from './fulfillment-details.actions';
import { Injectable } from '@angular/core';
import { OrderFulfillmentDto, OrderFulfillmentLineDto, OrderLineDto } from 'src/app/api/models';

export interface FulfillmentDetailsStateModel {
  fulfillment: OrderFulfillmentDto | undefined;
  lines: { orderLine: OrderLineDto, fulfillmentLine: OrderFulfillmentLineDto }[];
}

@State<FulfillmentDetailsStateModel>({
  name: 'fulfillmentDetails',
  defaults: {
    fulfillment: undefined,
    lines: []
  }
})
@Injectable()
export class FulfillmentDetailsState {

  @Selector()
  static fulfillment(state: FulfillmentDetailsStateModel): OrderFulfillmentDto | undefined {
    return state.fulfillment;
  }

  @Selector()
  static lines(state: FulfillmentDetailsStateModel): { orderLine: OrderLineDto, fulfillmentLine: OrderFulfillmentLineDto }[] {
    return state.lines;
  }

  @Action(SetDetails)
  setDetails(ctx: StateContext<FulfillmentDetailsStateModel>, action: SetDetails) {
    ctx.patchState({
      fulfillment: action.payload.fulfillment,
      lines: action.payload.lines
    });
  }

}
