import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { Recorrido } from 'src/app/core/model/recorrido';
import { Viaje } from "src/app/core/model/viaje";
import { DriverService } from 'src/app/core/services/driver.service';
import { DriverState } from "src/app/driver/store/driver.state";

@Component({
  selector: "evince-travel-list",
  templateUrl: "./travel-list.component.html",
  styleUrls: ["./travel-list.component.scss"]
})
export class TravelListComponent implements OnInit {
  
  @Select(DriverState.CurrentTravel)
  public iViajeActual: Observable<Viaje>;
  
  @Select(DriverState.CurrentRouteFrom)
  public iTerminalOrigen: Observable<string>;

  @Select(DriverState.CurrentRouteTo)
  public iTerminalDestino: Observable<string>;
  
  public iViajesFinalizados: Observable<Array<Recorrido>>;

  constructor(private iDriverService: DriverService) {}

  ngOnInit() {
    /* this.iDriverService.TravelClient.finnished().subscribe(recorrido => {
      const trayectos = recorrido.trayectos;
      const origen = trayectos[0].terminalOrigen;
      const destino = trayectos[trayectos.length - 1].terminalDestino;
      return {
        id: recorrido.id,
        origen,
        destino
      };
    }); */
  }
}
