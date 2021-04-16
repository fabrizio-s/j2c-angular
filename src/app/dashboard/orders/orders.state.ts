import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Initialize, SetOrders, SetPagination } from './orders.actions';
import { Injectable } from '@angular/core';
import { OrderDto } from 'src/app/api/models';
import { OrderStatus } from 'src/app/shared/model/order-status';

export interface OrdersStateModel {
  initialized: boolean;
  orders: OrderDto[];
  page: number;
  totalPages: number;
  status: OrderStatus | undefined;
}

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    initialized: false,
    orders: [],
    page: 0,
    totalPages: -1,
    status: undefined
  }
})
@Injectable()
export class OrdersState {

  @Selector()
  static initialized(state: OrdersStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static orders(state: OrdersStateModel): OrderDto[] {
    return state.orders;
  }

  @Selector()
  static page(state: OrdersStateModel): number {
    return state.page;
  }

  @Selector()
  static totalPages(state: OrdersStateModel): number {
    return state.totalPages;
  }

  @Selector()
  static status(state: OrdersStateModel): OrderStatus | undefined {
    return state.status;
  }

  @Action(Initialize)
  initialize(ctx: StateContext<OrdersStateModel>, action: Initialize) {
    ctx.patchState({
      initialized: true,
      orders: action.payload
    });
  }

  @Action(SetOrders)
  setOrders(ctx: StateContext<OrdersStateModel>, action: SetOrders) {
    ctx.patchState({
      orders: action.payload
    });
  }

  @Action(SetPagination)
  setPagination(ctx: StateContext<OrdersStateModel>, action: SetPagination) {
    ctx.patchState({
      page: action.payload.page,
      totalPages: action.payload.totalPages
    });
  }

}
