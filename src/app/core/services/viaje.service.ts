import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ViajeService {
    constructor(private http:HttpClient) {}

    get_viajes(){
        return this.http.get('http://localhost:3000/viajes');
    }
}