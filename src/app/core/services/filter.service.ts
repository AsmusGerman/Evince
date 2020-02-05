import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class FilterService {
    constructor() {}

    private isChecked: Subject<boolean> = new BehaviorSubject<boolean>(null);
    currentCheck = this.isChecked.asObservable();

    changeChecked(check: boolean) {
        this.isChecked.next(check);
      }
}
