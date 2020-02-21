import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { map } from "rxjs/operators";
import { SettingsState } from "src/app/core/store/settings/settings.state";
import { LoginResponse } from "src/app/core/responses/login.response";

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private store: Store) {}

  public register(
    username: string,
    password: string,
    name: string,
    lastname: string,
    role: number
  ) {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http.post(`${url}/auth/register`, {
      username,
      password,
      name,
      lastname,
      role
    });
  }

  public login(
    username: string,
    password: string,
    remember: boolean
  ): Observable<LoginResponse> {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http.post<LoginResponse>(`${url}/auth/login`, {
      username,
      password,
      remember
    });
  }

  public logout(token: string) {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http.post(`${url}/auth/logout`, {
      token
    });
  }

  public getRole() {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http
      .get<{ id: number; name: string }>(`${url}/auth/role`)
      .pipe(map(role => role.id));
  }

  public refreshToken(refreshToken: string) {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http.post(url, {
      refreshToken
    });
  }
}
