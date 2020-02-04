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
    public form: FormGroup;
    constructor(activateRoute: ActivatedRoute,private store: Store, private _location: Location, private dataService: DataService) {
    }
    ngOnInit() {

    }

    public submit() {
    }

    volver() {
      this._location.back();
    }
}