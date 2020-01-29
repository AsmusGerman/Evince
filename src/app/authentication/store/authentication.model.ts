export interface AuthStateModel {
  token: string | undefined;
  refreshToken: string | undefined;
  username: string | undefined;
  registered: boolean | undefined;
  role: number | undefined;
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
}

export class GetRole {
  static readonly type = "[Auth] Get Role";
}

export class RefreshToken {
  static readonly type = "[Auth] Refresh Token";
}
