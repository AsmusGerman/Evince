import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "evince-retraso-list",
  templateUrl: "./retraso-list.component.html"
})
export class RetrasoListComponent implements OnInit {
  @Input() iRetrasos: Array<any>;
  public iDisplayedColumns: string[] = ["tipo", "descripcion", "tiempo"];

  constructor() {}

  ngOnInit() {}
}
