export interface AuthStateModel {
  token: string | undefined;
  refreshToken: string | undefined;
  username: string | undefined;
  registered: boolean | undefined;
}

export class Register {
  static readonly type = "[Auth] Register";
  constructor(
    public payload: {
      username: string;
      password: string;
      name: string;
      lastname: string;
      role: number;
    }
  ) {}
}

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

export class RefreshToken {
  static readonly type = "[Auth] Refresh Token";
}
