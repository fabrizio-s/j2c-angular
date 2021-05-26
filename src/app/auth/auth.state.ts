import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetToken } from './auth.actions';
import { Token } from '../shared/model/token';
import { Injectable } from '@angular/core';

export interface AuthStateModel {
  token: Token;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: Token.anonymous()
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): Token {
    return state.token;
  }

  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateModel>, action: SetToken): void {
    ctx.patchState({
      token: action.payload
    });
  }

}
