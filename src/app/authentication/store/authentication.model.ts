export interface AuthStateModel {
  token: string | null;
  refreshToken: string | null;
  username: string | null;
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