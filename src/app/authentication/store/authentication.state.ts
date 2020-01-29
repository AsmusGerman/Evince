import {
  AuthStateModel,
  Login,
  Logout,
  RefreshToken,
  Register,
  GetRole
} from "./authentication.model";
import { Selector, State, Action, StateContext, Actions, NgxsOnInit } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import * as decoder from "jwt-decode";
import { LoginHandler } from "./handlers/login.handler";
import { LogoutHandler } from "./handlers/logout.handler";
import { RegisterHandler } from "./handlers/register.handler";

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
  constructor(
    private iLoginHandler: LoginHandler,
    private iLogoutHandler: LogoutHandler,
    private iRegisterHandler: RegisterHandler,
    private iAuthenticationService: AuthenticationService
  ) {
    this.iLoginHandler.initialize();
    this.iLogoutHandler.initialize();
    this.iRegisterHandler.initialize();
  }

  @Selector()
  static role(state: AuthStateModel): number | null {
    return state.role;
  }

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
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
    return this.iAuthenticationService.login(username, password, true).pipe(
      tap(
        (result: { token: string; refreshToken: string }) => {
          ctx.patchState({
            token: result.token,
            refreshToken: result.refreshToken,
            username
          });
        },
        error => console.log("error login")
      )
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.iAuthenticationService.logout(state.token).pipe(
      tap(() => {
        ctx.setState(defaults);
      })
    );
  }

  @Action(GetRole)
  getRoels(ctx: StateContext<AuthStateModel>) {
    return this.iAuthenticationService.getRole().pipe(
      tap(role => {
        ctx.patchState({
          role
        });
      })
    );
  }

  @Action(RefreshToken)
  refresh(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.iAuthenticationService.refreshToken(state.refreshToken).pipe(
      tap(
        (result: { token: string; tokenRefresh: string; username: string }) => {
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
