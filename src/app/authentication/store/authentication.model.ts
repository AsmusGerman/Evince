import { LoginResponseModel } from "../model/login.response";

export interface AuthStateModel extends LoginResponseModel {}

export class Login {
  static readonly type = "[Auth] Login";
  constructor(
    public payload: { username: string; password: string; remember: boolean }
  ) {}
}

export class Logout {
  static readonly type = "[Auth] Logout";
  constructor(public payload: { token: string }) {}
}
