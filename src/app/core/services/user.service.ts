import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class UserService {
  constructor() {}

  getCurrentUserProfile() {
    return of({
      name: "",
      role: "",
      email: ""
    });
  }
}
