import { Component, OnInit } from "@angular/core";
import { Retraso } from 'src/app/core/model/retraso';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "evince-retraso",
    templateUrl: "./retraso.component.html",
    styleUrls:["./retraso.component.scss"]
  })

  export class RetrasoComponent implements OnInit {
    public authorId = '';
  constructor(activateRoute: ActivatedRoute) {
    this.authorId = activateRoute.snapshot.params['id'];
  }
    ngOnInit() {
      console.log("RETRASO");
    }
}