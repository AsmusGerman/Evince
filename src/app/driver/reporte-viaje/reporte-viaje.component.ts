import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';
import { Viaje } from 'src/app/core/model/viaje';

@Component({
    selector: "evince-reporte-viaje",
    templateUrl: "./reporte-viaje.component.html"
  })

  export class ReporteViajeComponent implements OnInit {
    public viajeParaReporte;
    public form: FormGroup;
    public viajeId = '';
    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, private dataService: DataService) {
    this.viajeId = activateRoute.snapshot.params['id'];
    }
    ngOnInit() {
      //TODO: ver si pasar el viaje de esta forma o usar el id de la url
      this.viajeParaReporte = JSON.parse(localStorage.getItem("ViajeReporte"));
      this.form = new FormGroup({
        tipo: new FormControl(""),
        descripcion: new FormControl(""),
        tiempo: new FormControl("")
      })
    }

    public submit() {
    }

    volver() {
      this._location.back();
    }
}