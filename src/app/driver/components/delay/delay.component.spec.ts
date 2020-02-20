import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DelayComponent } from "./delay.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";
import { NgxsModule } from "@ngxs/store";
import { SettingsState } from "src/app/core/store/settings/settings.state";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";

describe("delay component", () => {
  let component: DelayComponent;
  let fixture: ComponentFixture<DelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DelayComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        CoreModule,
        NgxsModule.forRoot([SettingsState])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayComponent);
    component = fixture.componentInstance;

    component.iDelayTypes = ["Retraso A", "Retraso B", "Retraso C"];
    fixture.detectChanges();
  });

  it("debería crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("debería deshabilitar la creación si el formulario está incompleto", () => {
    const bButtonCreate = fixture.debugElement.query(
      By.css("button[data-test='button-create']")
    );
    expect(bButtonCreate).toBeTruthy();
    expect(bButtonCreate.attributes["disabled"]).toBeTruthy();
  });

  it("debería deshabilitar la creación si el formulario está completo y es inválido", () => {
    const bButtonCreate = fixture.debugElement.query(
      By.css("button[data-test='button-create']")
    );
    component.iFormGroup.setValue({
      type: component.iDelayTypes[0],
      timestamp: "13:10",
      description: "tiempo invalido"
    });
    component.iFormGroup.updateValueAndValidity();
    fixture.detectChanges();
    expect(bButtonCreate.attributes["disabled"]).toBeTruthy();
  });

  it("debería habilitar la creación si el formulario está completo y es válido", () => {
    const bButtonCreate = fixture.debugElement.query(
      By.css("button[data-test='button-create']")
    );
    component.iFormGroup.setValue({
      type: component.iDelayTypes[0],
      timestamp: "12:10",
      description: "tiempo válido"
    });
    component.iFormGroup.updateValueAndValidity();
    fixture.detectChanges();
    expect(bButtonCreate.attributes["disabled"]).not.toBeTruthy();
  });

  it("debería llamar al método cancel", async () => {
    spyOn(component, "cancel").and.callFake(() => Promise.resolve(true));
    fixture.debugElement
      .query(By.css("button[data-test='button-cancel']"))
      .nativeElement.click();
    fixture.detectChanges();
    expect(component.cancel).toHaveBeenCalled();
  });
});
