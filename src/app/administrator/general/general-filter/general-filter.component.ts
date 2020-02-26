import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "evince-general-filter",
  templateUrl: "./general-filter.component.html"
})
export class GeneralFilterComponent implements OnInit {
  @Input() iRecorridos: Array<any>;
  @Output() onFilterChanges = new EventEmitter<any>();

  public origenes: Array<any>;
  public destinos: Array<any>;
  public form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      origen: new FormControl(""),
      destino: new FormControl(""),
      suscripto: new FormControl("")
    });
    
    this.form.valueChanges.subscribe(data => this.onFilterChanges.emit(data));
    this.form.controls.suscripto.setValue(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.iRecorridos && !!this.iRecorridos) {
      this.updateOrigenes();
      this.updateDestinos();
    }
  }

  private updateOrigenes() {
    const _origenes = this.iRecorridos.map(recorrido => ({
      id: recorrido.origenId,
      description: recorrido.origen
    }));

    this.origenes = [...new Set(_origenes)];
  }

  private updateDestinos() {
    const _destinos = this.iRecorridos.map(recorrido => ({
      id: recorrido.destinoId,
      description: recorrido.destino
    }));

    this.destinos = [...new Set(_destinos)];
  }
}
