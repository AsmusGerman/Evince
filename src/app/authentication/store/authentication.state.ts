import {
  AuthStateModel,
  Login,
  Logout,
  RefreshToken,
  Register,
  GetRole
} from "./authentication.model";
import {
  Selector,
  State,
  Action,
  StateContext,
  Actions,
  NgxsOnInit
} from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import * as decoder from "jwt-decode";

const defaults: AuthStateModel = {
  token: null,
  refreshToken: null,
  username: null,
  registered: null,
  role: null
};

@State<AuthStateModel>({
  name: "auth",
  defaults
})
export class AuthState {
  constructor(private iAuthenticationService: AuthenticationService) {}

  @Selector()
  static role(state: AuthStateModel): number | null {
    return state.role;
  }

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static username(state: AuthStateModel): string | null {
    return state.username;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token && !!state.username;
  }

  @Selector()
  static isExpired(state: AuthStateModel): boolean {
    const { exp } = decoder(state.token);
    return exp < new Date().getTime();
  }

  @Selector()
  static registered(state: AuthStateModel): boolean {
    return state.registered;
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    const { username, password, name, lastname, role } = action.payload;
    return this.iAuthenticationService
      .register(username, password, name, lastname, role)
      .pipe(
        tap((result: { registered }) => {
          ctx.patchState({
            registered: result.registered
          });
        })
      );
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const { username, password } = action.payload;
    return this.iAuthenticationService
      .login({ username, password, remember: false })
      .pipe(
        tap(({ token, refreshToken, username, rol: role }) => {
          ctx.patchState({
            token,
            refreshToken,
            username,
            role
          });
        })
      );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const { token } = ctx.getState();
    return this.iAuthenticationService.logout({ token }).pipe(
      tap(() => {
        ctx.setState(defaults);
      })
    );
  }

  @Action(RefreshToken)
  refresh(ctx: StateContext<AuthStateModel>) {
    const { refreshToken, token } = ctx.getState();
    return this.iAuthenticationService
      .refreshToken({ token, refreshToken })
      .pipe(
        tap(
          (result: {
            token: string;
            tokenRefresh: string;
            username: string;
          }) => {
            ctx.patchState({
              token: result.token,
              refreshToken: result.tokenRefresh,
              username: result.username
            });
          }
        )
      );
  }
}
