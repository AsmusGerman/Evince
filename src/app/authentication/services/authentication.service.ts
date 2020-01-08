import { Injectable } from "@angular/core";
import { AuthenticationModule } from "../authentication.module";
import { Observable, of, EMPTY } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LoginResponseModel } from "../model/login.response";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: AuthenticationModule
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

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
    return of({
      username: "mock",
      token: "mock"
    });
  }

  public logout(token: string): Observable<void> {
    return EMPTY;
  }
}
