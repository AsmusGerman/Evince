import { Component, OnInit } from "@angular/core";
import {MatInputModule} from '@angular/material';

const RECORRIDOS = [
    {
        "id" : "A-C",
        "viajes": ["A-B","B-C"]
      },
      {
        "id" : "F-I",
        "viajes": ["F-G","G-H","H-I"]
    }
];

@Component({
  selector: "evince-recorridos-list",
  templateUrl: "./recorridos-list.component.html",
  styleUrls:["./recorridos-list.component.scss"]
})

export class RecorridosListComponent implements OnInit {
  //public iDisplayedColumns: string[] = ["code", "last", "state","subscription", "analyze"];
    public iDataSource = RECORRIDOS;
  
  constructor() {}

  ngOnInit() {
      console.log("asd");
  }

}
