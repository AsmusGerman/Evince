import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { map } from "rxjs/operators";

@Injectable()
export class AuthenticationService {
  private entrypoint: string;

  constructor(private http: HttpClient, private store: Store) {
    // get the api url from store
    this.store
      .select(state => state.settings.entrypoint)
      .subscribe(url => (this.entrypoint = url));
  }

  public register(
    username: string,
    password: string,
    name: string,
    lastname: string,
    role: number
  ) {
    return this.http.post(`${this.entrypoint}/auth/register`, {
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
  ): Observable<any> {
    return this.http.post(`${this.entrypoint}/auth/login`, {
      username,
      password,
      remember
    });
  }

  public logout(token: string) {
    return this.http.post(`${this.entrypoint}/auth/logout`, {
      token
    });
  }

  public getRole() {
    return this.http
      .get<{ id: number; name: string }>(`${this.entrypoint}/auth/role`)
      .pipe(map(role => role.id));
  }

  public refreshToken(refreshToken: string) {
    return this.http.post(this.entrypoint, {
      refreshToken
    });
  }
}
