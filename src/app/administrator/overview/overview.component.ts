import { Component, OnInit } from "@angular/core";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { Recorrido } from "src/app/core/model/recorrido";

@Component({
  selector: "evince-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {

  constructor(private iAdministratorService: AdministratorService) {}

  private subsOnly:boolean=false;
  private iRecorridos:Array<any>;

  console(code:string,subscription:boolean):void{
    console.log(code);
    console.log(subscription);
  }

  ngOnInit() {
     this.iAdministratorService.RoutesClient.get().subscribe(
      recorridos => (this.iRecorridos = recorridos)
    );
  }
}
