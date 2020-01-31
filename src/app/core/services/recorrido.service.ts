import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { SettingsState } from '../store/settings/settings.state';
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root'
  })
export class RecorridoService {
    constructor(private http:HttpClient,private injector: Injector) {}

    getRecorridos(){
        var recorridos = [];
        //return this.http.get('http://localhost:3000/recorridos');
        const url = this.injector
            .get(Store)
            .selectSnapshot(SettingsState.entrypoint);
        this.injector
            .get(HttpClient)
            .get(`${url}/passengerstransport/getdriverroadmap`)
            .subscribe({
                //next: result => console.log(result),
                next: result => {recorridos.push(result); console.log(result)},
                error: error => console.log(error)
            });
            return recorridos;
    }
}