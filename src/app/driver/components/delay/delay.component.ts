import { Component, EventEmitter, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Viaje } from "src/app/core/model/viaje";
import { DriverService } from "src/app/core/services/driver.service";
import { DriverState } from "../../store/driver.state";
import { NewDelay } from "../../store/driver.model";
import { MatBottomSheetRef } from "@angular/material";
import { map } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "evince-delay",
  templateUrl: "./delay.component.html"
})
export class DelayComponent implements OnInit {
  public iFormGroup: FormGroup;
  public iDelayTypes: { key: number; value: string }[];

  @Select(DriverState.CurrentTravel)
  public iViajeActual: Observable<Viaje>;

  constructor(
    private iFormBuilder: FormBuilder,
    private iDriverService: DriverService,
    private iStore: Store,
    private iMatBottomSheetRef: MatBottomSheetRef<DelayComponent>
  ) {}

  ngOnInit() {
    this.iDriverService.DelayClient.types()
      .pipe(
        map(delays => delays.map((delay, idx) => ({ key: idx, value: delay })))
      )
      .subscribe(delays => {
        this.iDelayTypes = delays;
      });

    this.iFormGroup = this.iFormBuilder.group({
      type: new FormControl("", [Validators.required]),
      hours: new FormControl("", [Validators.required]),
      minutes: new FormControl("", [Validators.required]),
      description: new FormControl("", [
        Validators.maxLength(350),
        Validators.minLength(0)
      ])
    });
  }

  public onSubmit({ type, hours, minutes, description }) {
    const time = moment(`${hours}:${minutes}`, "HH:mm").format("HH:mm");
    this.iStore.dispatch(new NewDelay({ type, time, description }));
    this.close();
  }

  public close() {
    this.iMatBottomSheetRef.dismiss();
    event.preventDefault();
  }
}
