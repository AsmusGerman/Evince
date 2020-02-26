import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "evince-delays-list",
  templateUrl: "./delays-list.component.html"
})
export class DelaysListComponent implements OnInit {
  @Input() iRetrasos: Array<any>;
  public iDisplayedColumns: string[] = ["tipo", "descripcion", "tiempo"];

  constructor() {}

  ngOnInit() {
    this.iRetrasos.forEach(ret=>{
      var minutes=ret.tiempo;
      var tooltipText="";
      if(minutes>=60){
        var hours = Math.floor(minutes/60);
        tooltipText+=hours+' hs y ';
        minutes=minutes%60
      }
      tooltipText+=minutes+' minutos';
      ret.tiempo=tooltipText;
    });
  }
}
