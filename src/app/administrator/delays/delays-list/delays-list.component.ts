import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "evince-delays-list",
  templateUrl: "./delays-list.component.html"
})
export class DelaysListComponent implements OnInit {
  @Input() iRetrasos: Array<any>;
  public iDisplayedColumns: string[] = ["tipo", "descripcion", "tiempo"];

  constructor() {}

  ngOnInit() {}
}
