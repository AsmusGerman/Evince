import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class FilterService {
    constructor() {
      this.currentDataSubj.next(this.ELEMENT_DATA);
    }

    ELEMENT_DATA= [
      {
        position: 1,
        last: "01-01-2020 10:15",
        state: "waiting",
        code: "abc",
        subscription: true
      },
      {
        position: 2,
        last: "",
        state: "disabled",
        code: "aebc",
        subscription: false
      },
      {
        position: 3,
        last: "05-01-2020 16:15",
        state: "on the road",
        code: "aedbc",
        subscription: false
      },
      {
        position: 4,
        last: "10-01-2020 13:00",
        state: "waiting",
        code: "adbc",
        subscription: true
      },
      {
        position: 5,
        last: "08-01-2020 15:30",
        state: "waiting",
        code: "bcf",
        subscription: false
      },
      {
        position: 6,
        last: "11-01-2020 18:00",
        state: "on the road",
        code: "bcfg",
        subscription: false
      },
      {
        position: 7,
        last: "08-01-2020 18:00",
        state: "disabled",
        code: "bcg",
        subscription: false
      },
      {
        position: 8,
        last: "13-02-2020 04:15",
        state: "disabled",
        code: "bcgi",
        subscription: true
      }
    ];

    private currentDataSubj: Subject<Array<any>> = new BehaviorSubject<Array<any>>([]);
    currentData = this.currentDataSubj.asObservable();

    private isChecked: Subject<boolean> = new BehaviorSubject<boolean>(null);
    currentCheck = this.isChecked.asObservable();

    changeChecked(check: boolean) {
        this.isChecked.next(check);
        check ? 
          this.currentDataSubj.next(this.ELEMENT_DATA.filter(elem=>elem.subscription)) :
            this.currentDataSubj.next(this.ELEMENT_DATA);
      }

    updateData(elem: any){
/*       this.currentDataSubj.next(this.ELEMENT_DATA.filter(filterElem=>
        if(filterElem.code==elem.code){
          filterElem.subscription=!filterElem.subscription;
        }) */
    }
}
