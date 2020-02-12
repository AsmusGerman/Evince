import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class FilterService {
    constructor() {
      this.currentDataSubj.next(this.ELEMENT_DATA);
      this.sort();
      this.getCodigos();
      this.getCantRetrasos();
    }

    ELEMENT_DATA= [
      {
        position: 1,
        last: "01-01-2020 10:15",
        state: "waiting",
        code: "ROSSTAFE",
        origen: "Rosario",
        destino: "Santa Fe",
        subscription: true,
        cantRetrasos: 5
      },
      {
        position: 2,
        last: "",
        state: "disabled",
        code: "GCHUCAP",
        origen: "Gualeguaychu",
        destino: "Capital",
        subscription: false,
        cantRetrasos: 10
      },
      {
        position: 3,
        last: "05-01-2020 16:15",
        state: "on the road",
        code: "VTUBAR",
        origen: "Venado Tuerto",
        destino: "Bariloche",
        subscription: false,
        cantRetrasos: 8
      },
      {
        position: 4,
        last: "10-01-2020 13:00",
        state: "waiting",
        code: "BARVTU",
        origen: "Bariloche",
        destino: "Venado Tuerto",
        subscription: true,
        cantRetrasos: 3
      },
      {
        position: 5,
        last: "08-01-2020 15:30",
        state: "waiting",
        code: "COLCAS",
        origen: "Colon",
        destino: "Caseros",
        subscription: false,
        cantRetrasos: 8
      },
      {
        position: 6,
        last: "11-01-2020 18:00",
        state: "on the road",
        code: "COLPRO",
        origen: "Colon",
        destino: "Pronunciamiento",
        subscription: false,
        cantRetrasos: 4
      },
      {
        position: 7,
        last: "08-01-2020 18:00",
        state: "disabled",
        code: "FEDCON",
        origen: "Federacion",
        destino: "Concordia",
        subscription: false,
        cantRetrasos: 12
      },
      {
        position: 8,
        last: "13-02-2020 04:15",
        state: "disabled",
        code: "LPAPAR",
        origen: "La Paz",
        destino: "Concordia",
        subscription: true,
        cantRetrasos: 2
      }
    ];

    origenes = [
      {value: '0', viewValue: 'Rosario'},
      {value: '1', viewValue: 'Gualeguaychu'},
      {value: '2', viewValue: 'Venado Tuerto'},
      {value: '3', viewValue: 'Bariloche'},
      {value: '4', viewValue: 'Colon'},
      {value: '5', viewValue: 'Federacion'},
      {value: '6', viewValue: 'La Paz'}
    ];

    destinos = [
      {value: '0', viewValue: 'Santa Fe'},
      {value: '1', viewValue: 'Capital'},
      {value: '2', viewValue: 'Bariloche'},
      {value: '3', viewValue: 'Venado Tuerto'},
      {value: '4', viewValue: 'Caseros'},
      {value: '5', viewValue: 'Pronunciamiento'},
      {value: '6', viewValue: 'Concordia'}
    ];

    private codigosFiltroSubj: Subject<Array<string>> = new BehaviorSubject<Array<string>>([]);
    codigosFiltro=this.codigosFiltroSubj.asObservable();

    private cantRetrasosPorCodigoSubj: Subject<Array<number>> = new BehaviorSubject<Array<number>>([]);
    cantRetrasosPorCodigoFiltro=this.cantRetrasosPorCodigoSubj.asObservable();

    private currentDataSubj: Subject<Array<any>> = new BehaviorSubject<Array<any>>([]);
    currentData = this.currentDataSubj.asObservable();

    private isChecked/* : Subject<boolean> */ = new BehaviorSubject<boolean>(null);
    currentCheck = this.isChecked.asObservable();

    private origenSelectSubj /*:  Subject<Array<any>>  */= new BehaviorSubject<string>(null);
    origenSelect = this.origenSelectSubj.asObservable();

    private destinoSelectSubj/* : Subject<Array<any>> */ = new BehaviorSubject<string>(null);
    destinoSelect = this.destinoSelectSubj.asObservable();

    sort() {
      this.ELEMENT_DATA.sort((rec1, rec2) => {
        if (rec1.cantRetrasos > rec2.cantRetrasos) {
            return 1;
        }
    
        if (rec1.cantRetrasos < rec2.cantRetrasos) {
            return -1;
        }
    
        return 0;
      });
    }

    getCodigos() {
      var codigos = [];
      for (var recorrido of Object.entries(this.ELEMENT_DATA.filter(elem=>elem.subscription))) {
        codigos.push(recorrido[1].code);
      }
      this.codigosFiltroSubj.next(codigos);
    }

    getCantRetrasos() {
      var cantsRetrasos = [];
      for (var recorrido of Object.entries(this.ELEMENT_DATA.filter(elem=>elem.subscription))) {
        cantsRetrasos.push(recorrido[1].cantRetrasos);
      }
      this.cantRetrasosPorCodigoSubj.next(cantsRetrasos);
    }

    filterBySubscriptions() {
      this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>elem.subscription));
    }

    changeChecked(check: boolean) {
      this.isChecked.next(check);
      check ? 
        this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>elem.subscription)) :
          this.currentDataSubj.next(this.ELEMENT_DATA);
      //this.sort();
    }

    updateData(elemCode: any){
      //this.sort();
      var index = this.ELEMENT_DATA.findIndex(elemToUpdate => elemToUpdate.code == elemCode );
      this.ELEMENT_DATA[index].subscription ?
        this.ELEMENT_DATA[index].subscription=false :
          this.ELEMENT_DATA[index].subscription=true;
      this.getCodigos();
      this.getCantRetrasos();
    }

    searchFilter(filter) {
      this.origenSelectSubj.next(null);
      this.destinoSelectSubj.next(null);
      this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>
        elem.origen.toLowerCase().includes(filter.toLowerCase()) || 
          elem.destino.toLowerCase().includes(filter.toLowerCase())));
    }

    changeOrigen(origen) {
      console.log("estoy cambiando origen");
      console.log("origen " +origen["viewValue"]);
      console.log("destino " +this.destinoSelectSubj.value["viewValue"]);
      this.origenSelectSubj.next(origen);
      this.destinoSelectSubj.value==null ?
        this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>elem.origen==origen["viewValue"])):
          this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>elem.origen==origen["viewValue"] && elem.destino==this.destinoSelectSubj.value));
    }

    changeDestino(destino) {
      console.log("estoy cambiando destino");
      console.log("origen " +this.origenSelectSubj.value["viewValue"]);
      console.log("destino " +destino["viewValue"]);
      this.destinoSelectSubj.next(destino);
      this.origenSelectSubj.value==null ?
        this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>elem.destino==destino["viewValue"])):
          this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>elem.destino==destino["viewValue"] && elem.origen==this.origenSelectSubj.value));
    }
}
