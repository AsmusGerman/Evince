import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter
  } from "@angular/core";
  
  @Component({
    selector: "evince-retraso-list",
    templateUrl: "./retraso-list.component.html",
    styleUrls: ["./retraso-list.component.scss"]
  })
  export class RetrasoListComponent implements OnInit {

    @Input() retrasosAAnalizar: Array<any>;

    public iDisplayedColumns: string[] = ["tipo","descripcion","tiempo"];
  
    constructor() {}

    ngOnInit() {

    }
  
    ngOnChanges() {

    }
  
    ngAfterViewInit() {

    }
  }
  