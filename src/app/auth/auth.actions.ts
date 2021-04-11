import { Token } from "../shared/model/token";

export class SetToken {
  static readonly type = '[Auth] SetToken';
  constructor(public payload: Token) { }
}
