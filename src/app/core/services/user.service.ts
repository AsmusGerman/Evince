import { HttpClient } from '@angular/common/http';

export class UserService {
    constructor(private http:HttpClient) {}

    get_user(){
        return this.http.get('http://localhost:3000/users');
    }
}