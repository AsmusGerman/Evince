import { Component, OnInit } from "@angular/core";
import { Retraso } from 'src/app/core/model/retraso';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { Viaje } from 'src/app/core/model/viaje';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import * as moment from 'moment';

@Component({
    selector: "evince-retraso",
    templateUrl: "./retraso.component.html",
    styleUrls:["./retraso.component.scss"]
  })

  export class RetrasoComponent implements OnInit {
    //subscriptionViajeActual: Subscription;
    //public viajeActual:Viaje=this.dataService.getViajeActual();
    public tipo;
    public descripcion;
    public tiempo;
    public retraso:Retraso=new Retraso();
    public form: FormGroup;
    public retrasoPorDemora;
    tiempoDemoraNum:number;

  public submit() {
    if (this.form.valid) {
      var retraso:Retraso=new Retraso();
      retraso.id="Retraso1";
      retraso.tipo=this.form.get("tipo").value;
      retraso.descripcion=this.form.get("descripcion").value;
      retraso.tiempo=parseFloat(this.form.get("tiempo").value);
      //this.viajeActual.retrasos.push(retraso);
      this.dataService.getViajeActual().retrasos.push(retraso);
      this._location.back();
      }
    }

    cancelar() {
      this._location.back();
    }

    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, 
      private dataService: DataService) {}

    ngOnInit() {
      this.form = new FormGroup({
        tipo: new FormControl(""),
        descripcion: new FormControl(""),
        tiempo: new FormControl("")
      })
    }
}