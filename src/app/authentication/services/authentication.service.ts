import { Injectable } from "@angular/core";
import { Observable, of, EMPTY } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginResponseModel } from "../model/login.response";
import { Store } from "@ngxs/store";

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private iJwtHelperService: JwtHelperService,
    private store: Store
  ) {
    //    this.store.select(state => state.settings.entrypoint) //url de la api
  }

  public signin(username: string, password: string) {
    /* return this.http
      .post(url, {
        username,
        password
      })
      .pipe(map((response: any) => response.body)); */
  }

  public login(
    username: string,
    password: string,
    remember: boolean
  ): Observable<LoginResponseModel> {
    /* return this.http
      .post(url, {
        username,
        password,
        remember
      })
      .pipe(map((token: any) => this.iJwtHelperService.decodeToken(token))); */

    return of({
      username: "mock",
      token: "mock"
    });
  }

  public logout(token: string): Observable<void> {
    return EMPTY;
  }
}
