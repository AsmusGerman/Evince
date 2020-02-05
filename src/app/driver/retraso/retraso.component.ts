import { Component, OnInit } from "@angular/core";
import { Retraso } from 'src/app/core/model/retraso';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    public tipo:any;
    tipoControl:FormControl;
    descripcionControl:FormControl;
    horasControl:FormControl;
    minutosControl:FormControl;
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
      retraso.tipo=this.tipo.viewValue;
      retraso.descripcion=this.form.get("descripcionControl").value;
      retraso.tiempo=parseFloat(this.form.get("horasControl").value);
      this.dataService.getViajeActual().retrasos.push(retraso);

      this._location.back();
      }
    }

    cancelar() {
      this._location.back();
    }

    //TODO:VALIDACIONES EN LOS CONTROLES DEL FORM

    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, 
      private dataService: DataService) {
        this.form = new FormGroup({
          tipoControl: new FormControl(),
          descripcionControl: new FormControl(),
          horasControl:new FormControl()
        })
      }

    ngOnInit() {
    }
}