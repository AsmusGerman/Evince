import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngxs/store";

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
    return this.http.post(this.entrypoint, {
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
    return this.http.post(this.entrypoint, {
      username,
      password,
      remember
    });
  }

  public logout(token: string) {
    return this.http.post(this.entrypoint, {
      token
    });
  }

  public refreshToken(refreshToken: string) {
    return this.http.post(this.entrypoint, {
      refreshToken
    });
  }
}
