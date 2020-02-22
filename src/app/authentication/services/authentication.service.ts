import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngxs/store";
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

  public login(body: {
    username: string;
    password: string;
    remember: boolean;
  }): Observable<LoginResponse> {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http.post<LoginResponse>(`${url}/auth/login`, body);
  }

  public logout(body: { token: string }) {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http.post(`${url}/auth/logout`, body);
  }

  public refreshToken(body: { token; refreshToken }) {
    const url = this.store.selectSnapshot(SettingsState.entrypoint);
    return this.http.post(url, body);
  }
}
