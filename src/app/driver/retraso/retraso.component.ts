import { Component, OnInit } from "@angular/core";
import { Retraso } from 'src/app/core/model/retraso';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: "evince-retraso",
    templateUrl: "./retraso.component.html",
    styleUrls:["./retraso.component.scss"]
  })

  export class RetrasoComponent implements OnInit {
    private tiempoCrono;
    public form: FormGroup;
    public authorId = '';
    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, private data: DataService) {
      this.authorId = activateRoute.snapshot.params['id'];
    }
    ngOnInit() {
      this.form = new FormGroup({
        tipo: new FormControl(""),
        descripcion: new FormControl(""),
        tiempo: new FormControl("")
      })
      this.data.currentMessage.subscribe(message => this.tiempoCrono = message);
    }

    newMessage() {
      console.log("PASANDO DE RETRASO A RECORRIDOLIST");
      //this.data.changeMessage("Hello from Sibling");
      /* this.data.changeMessage(this.tiempoCrono); */

    }

    public submit() {
      debugger;
      if (this.form.valid) {
        this.store
          .dispatch(new Retraso(this.form.value))
          .pipe(
            // gets the logged user profile from the store
            switchMap(() => this.store.select(store => store.authentication.profile))
          )
          .subscribe((profile: string) => {
            alert(profile);
            /* if(profile == "driver") {
              this.loginAsDriver();
            } else {
              this.loginAsAdministrator();
            } */
          });
      }
    }

    cancelar() {
      this._location.back();
      console.log("SALIENDO DE RETRASO")
      this.data.changeMessage(this.tiempoCrono);
    }
}