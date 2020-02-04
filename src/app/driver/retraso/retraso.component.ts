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

@Component({
    selector: "evince-retraso",
    templateUrl: "./retraso.component.html",
    styleUrls:["./retraso.component.scss"]
  })

  export class RetrasoComponent implements OnInit {
    subscriptionViajeActual: Subscription;
    public viajeActual:Viaje=this.dataService.getViajeActual();
    public tipo;
    public descripcion;
    public tiempo;
    public retraso:Retraso=new Retraso();
    public form: FormGroup;
    public viajeId = '';
    //public viajeParaRetraso;
    public retrasoPorDemora;

  public submit() {
    if (this.form.valid) {
      var retraso:Retraso=new Retraso();
      retraso.id="Retraso1";
      retraso.tipo=this.form.get("tipo").value;
      retraso.descripcion=this.form.get("descripcion").value;
      retraso.tiempo=this.form.get("tiempo").value;
      this.viajeActual.retrasos.push(retraso);
      this._location.back();
      //this.viajeParaRetraso.retrasos.push(retraso);
      //localStorage.setItem("ViajeActual", JSON.stringify(this.viajeParaRetraso));
      }
    }

    cancelar() {
      this._location.back();
    }

    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, 
      private dataService: DataService) 
    {
/*       console.log(this.viajeActual);
      this.subscriptionViajeActual = this.dataService.getViajeActual().subscribe(va => {
        console.log(va);
        if (va) {
          this.viajeActual=va;
          console.log(this.viajeActual);
        }
        else {
          console.log("VIAJE ACTUAL NULL");
          this.viajeActual=null;
        }
      }); */
    }
    ngOnInit() {
      //TODO: ver si pasar el viaje de esta forma o usar el id de la url
      //this.viajeParaRetraso = JSON.parse(localStorage.getItem("ViajeActual"));
      //console.log(localStorage);
      //console.log(JSON.parse(localStorage.getItem("ViajeActual")));
      this.form = new FormGroup({
        tipo: new FormControl(""),
        descripcion: new FormControl(""),
        tiempo: new FormControl("")
      })

    }


}