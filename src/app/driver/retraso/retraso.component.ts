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
    message:string;
    public form: FormGroup;
    public viajeId = '';
    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, private dataService: DataService) {
      this.viajeId = activateRoute.snapshot.params['id'];
    }
    ngOnInit() {
      this.form = new FormGroup({
        tipo: new FormControl(""),
        descripcion: new FormControl(""),
        tiempo: new FormControl("")
      })
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
          });
      }
    }

    cancelar() {
      this._location.back();
    }
}