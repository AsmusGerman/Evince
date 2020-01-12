import { AuthStateModel, Login, Logout } from './authentication.model';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
      token: null,
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
  
    constructor(private authenticationService: AuthenticationService) {}
  
    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
      const {username, password, remember} = action.payload;
      return this.authenticationService.login(username, password, remember).pipe(
        tap((result: { token: string }) => {
          ctx.patchState({
            token: result.token,
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
            username: null
          });
        })
      );
    }
  }