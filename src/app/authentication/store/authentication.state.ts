import {
  AuthStateModel,
  Login,
  Logout,
  RefreshToken,
  Register
} from "./authentication.model";
import { Selector, State, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import * as decoder from "jwt-decode";

const defaults: AuthStateModel = {
  token: null,
  refreshToken: null,
  username: null,
  registered: null
};

@State<AuthStateModel>({
  name: "auth",
  defaults
})
export class AuthState {
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

  constructor(private authenticationService: AuthenticationService) {}

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    const { username, password, name, lastname, role } = action.payload;
    return this.authenticationService
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
    const { username, password, remember } = action.payload;
    return this.authenticationService.login(username, password, remember).pipe(
      tap((result: { token: string; tokenRefresh: string }) => {
        ctx.patchState({
          token: result.token,
          refreshToken: result.tokenRefresh,
          username
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authenticationService.logout(state.token).pipe(
      tap(() => {
        ctx.setState(defaults);
      })
    );
  }

  @Action(RefreshToken)
  refresh(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authenticationService.refreshToken(state.refreshToken).pipe(
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
