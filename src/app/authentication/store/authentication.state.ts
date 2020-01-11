import {
  AuthStateModel,
  Login,
  Logout,
  RefreshToken
} from "./authentication.model";
import { Selector, State, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import * as decoder from "jwt-decode";
@State<AuthStateModel>({
  name: "auth",
  defaults: {
    token: null,
    refreshToken: null,
    username: null
  }
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

  constructor(private authenticationService: AuthenticationService) {}

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
        ctx.setState({
          token: null,
          refreshToken: null,
          username: null
        });
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
