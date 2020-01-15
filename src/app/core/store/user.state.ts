import { Selector, State, Action, StateContext } from "@ngxs/store";
import { UserService } from '../services/user.service';
import { Identify } from './user.model';
import { tap } from 'rxjs/operators';

@State<any | null>({
  name: "user",
  defaults: null
})
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  static profile(state: any): any | null {
    return state.user.profile;
  }

  @Action(Identify)
  login(ctx: StateContext<any>, action: Identify) {
    /* return this.userService.getCurrentUserProfile().pipe(
      tap(result => {
        ctx.patchState({
          //TODO: agregar al estado, la info del usuario actual
        });
      })
    ); */
  }
}
