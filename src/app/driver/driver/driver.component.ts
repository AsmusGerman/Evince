import { Component, OnInit, Injector } from '@angular/core';
import { Recorrido } from '../../models/recorrido';
import { Viaje } from '../../models/viaje';
import { RecorridoService } from 'src/app/core/services/recorrido.service'
import { ViajeService } from 'src/app/core/services/viaje.service';

@Component({
  selector: 'evince-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  panelOpenState = false;
  private recorridos : Recorrido[] = [];
  private mapRecorridos:Map<string,Viaje[]>= new Map();
  //private x: Map<number, string> = new Map<number, string>();
  //x.set(5, "woa");
  private viajes : Viaje[] = [];
  constructor(private recorridoService: RecorridoService, private viajeService: ViajeService) {}

  llenarMap(mapa:Map<string,Viaje[]>){

    this.viajes.forEach(function(viaje){
      var viajesList:Viaje[]=[];
      if(mapa.has(viaje.recorridoId)){
        viajesList=mapa.get(viaje.recorridoId);
      }
      viajesList.push(viaje);
      mapa.set(viaje.recorridoId,viajesList);
    });
    console.log(mapa);
  }

  ngOnInit() {
    this.recorridoService.get_recorridos().subscribe((res : Recorrido[])=>{
      this.recorridos = res;
      this.viajeService.get_viajes().subscribe((resViaje: Viaje[]) => {
        this.viajes=resViaje;
        this.llenarMap(this.mapRecorridos);
      });
    });
  }

}