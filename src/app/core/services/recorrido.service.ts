import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class RecorridoService {
    constructor(private http:HttpClient) {}

    get_recorridos(){
        return this.http.get('http://localhost:3000/recorridos');
    }
}