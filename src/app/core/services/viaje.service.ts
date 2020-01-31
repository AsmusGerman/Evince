import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { RecorridoService } from 'src/app/core/services/recorrido.service';
import { Viaje } from 'src/app/models/viaje'

@Injectable({
    providedIn: 'root'
  })
export class ViajeService implements OnInit{
    constructor(private http:HttpClient, private recorridoService: RecorridoService) {}

    /* private recorridos : any[] = this.recorridoService.getRecorridos(); */
    
/*     private viajeActual=this.recorridos.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.orden==0)
         this.viajeActual=ee;
      });
     }); */
    

/*     getViajeActual(): Viaje {
      return <Viaje> <unknown>this.viajeActual;
    } */

/*     getRecorridos() {
      return this.recorridos;
    } */

    ngOnInit() {
        
       }

/*     get_viajes(){
        return this.http.get('http://localhost:3000/viajes');
    } */

/*     getViajeActual() {
        this.iDataSource.filter(e=>{
          e.viajes.filter(ee=> {
           if(ee.actual==true)
             this.viajeActual=ee;
          });
         });
     } */
}