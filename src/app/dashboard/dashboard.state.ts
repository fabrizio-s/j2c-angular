import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Initialize } from './dashboard.actions';
import { Injectable } from '@angular/core';
import { UserDto } from 'src/app/api/models';

export interface DashboardStateModel {
  user: UserDto | undefined;
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    user: undefined
  }
})
@Injectable()
export class DashboardState {

  @Selector()
  static user(state: DashboardStateModel): UserDto | undefined {
    return state.user;
  }

  @Action(Initialize)
  initialize(ctx: StateContext<DashboardStateModel>, action: Initialize) {
    ctx.patchState({
      user: action.payload
    });
  }

}
