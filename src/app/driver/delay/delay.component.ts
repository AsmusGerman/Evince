import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DriverService } from "src/app/core/services/driver.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "evince-delay",
  templateUrl: "./delay.component.html"
})
export class DelayComponent implements OnInit {
  public iFormGroup: FormGroup;
  public iCurrentTravel: string;
  public iDelayTypes: Array<string> = [];

  constructor(
    private iRouter: Router,
    private iActivatedRoute: ActivatedRoute,
    private iFormBuilder: FormBuilder,
    private iDriverService: DriverService
  ) {}

  ngOnInit() {
    this.iActivatedRoute.paramMap
      .pipe(
        switchMap((bActivatedRouteParam: any) => {
          this.iCurrentTravel = bActivatedRouteParam.params.id;
          return this.iDriverService.DelayClient.types();
        })
      )
      .subscribe(delays => (this.iDelayTypes = delays));

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

  public cancel() {
    this.iRouter.navigate(["../"], { relativeTo: this.iActivatedRoute });
  }

  public onSubmit({ type, timestamp, description }) {
    this.iDriverService.DelayClient.push({
      type,
      timestamp,
      description,
      travel: this.iCurrentTravel
    });

    this.iRouter.navigate(["../"], { relativeTo: this.iActivatedRoute });
  }
}
