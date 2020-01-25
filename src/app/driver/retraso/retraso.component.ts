import { Component, OnInit } from "@angular/core";
import { Retraso } from 'src/app/core/model/retraso';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';
import { Viaje } from 'src/app/core/model/viaje';

@Component({
    selector: "evince-retraso",
    templateUrl: "./retraso.component.html",
    styleUrls:["./retraso.component.scss"]
  })

  export class RetrasoComponent implements OnInit {
    public tipo;
    public descripcion;
    public tiempo;
    public retraso:Retraso=new Retraso();
    public form: FormGroup;
    public viajeId = '';
    public viajeParaRetraso;
    public retrasoPorDemora;
    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, private dataService: DataService) 
    {
      this.viajeId = activateRoute.snapshot.params['id'];
      this.retrasoPorDemora=JSON.parse(localStorage.getItem("Demora"));
      console.log("RETRASO POR DEMORA "+this.retrasoPorDemora);
    }
    ngOnInit() {
      //TODO: ver si pasar el viaje de esta forma o usar el id de la url
      this.viajeParaRetraso = JSON.parse(localStorage.getItem("ViajeActual"));
      console.log(localStorage);
      console.log(JSON.parse(localStorage.getItem("ViajeActual")));
      this.form = new FormGroup({
        tipo: new FormControl(""),
        descripcion: new FormControl(""),
        tiempo: new FormControl("")
      })

    }

    public submit() {
/*       if (this.form.valid) {
        this.store
          .dispatch(new Retraso(this.form.value))
          .pipe(
            // gets the logged user profile from the store
            switchMap(() => this.store.select(store => store.authentication.profile))
          )
          .subscribe((profile: string) => {
            alert(profile);
          });
      } */
      var retraso:Retraso=new Retraso();
      retraso.id="Retraso1";
      retraso.tipo=this.form.get("tipo").value;
      retraso.descripcion=this.form.get("descripcion").value;
      retraso.tiempo=this.form.get("tiempo").value;
      this.viajeParaRetraso.retrasos.push(retraso);
      localStorage.setItem("ViajeActual", JSON.stringify(this.viajeParaRetraso));
    }

    cancelar() {
      this._location.back();
    }
}