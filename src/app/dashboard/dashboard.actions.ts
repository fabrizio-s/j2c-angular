import { UserDto } from "src/app/api/models";

export class Initialize {
  static readonly type = '[Dashboard] Initialize';
  constructor(public payload: UserDto) { }
}
