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

@Component({
  selector: "evince-delay",
  templateUrl: "./delay.component.html"
})
export class DelayComponent implements OnInit {
  public iFormGroup: FormGroup;
  public iDelayTypes: Array<string> = [];

  @Select(DriverState.CurrentTravel)
  public iViajeActual: Observable<Viaje>;

  constructor(
    private iFormBuilder: FormBuilder,
    private iDriverService: DriverService,
    private iStore: Store,
    private iMatBottomSheetRef: MatBottomSheetRef<DelayComponent>
  ) {}

  ngOnInit() {
    this.iDriverService.DelayClient.types().subscribe(
      delays => (this.iDelayTypes = delays)
    );

    this.iFormGroup = this.iFormBuilder.group({
      type: new FormControl("", [Validators.required]),
      timestamp: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(0[0-9]|1[0-2]):[0-5][0-9]$/gm)
      ]),
      description: new FormControl("", [
        Validators.maxLength(350),
        Validators.minLength(0)
      ])
    });
  }

  public onSubmit({ type, timestamp, description }) {
    this.iStore.dispatch(new NewDelay({ type, timestamp, description }));
    this.close();
  }

  public close() {
    this.iMatBottomSheetRef.dismiss();
    event.preventDefault();
  }
}
