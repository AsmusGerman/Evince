import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { filter } from "rxjs/operators";

@Component({
  selector: "evince-general-filter",
  templateUrl: "./general-filter.component.html"
})
export class GeneralFilterComponent implements OnInit {
  @Input() iRecorridos: Array<any>;
  @Output() onFilterChanges = new EventEmitter<any>();
  @Output() onFilterReset = new EventEmitter<void>();

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
    this.form.controls.suscripto.setValue(true);
    this.form.valueChanges.subscribe(data => this.onFilterChanges.emit(data));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.iRecorridos && !!this.iRecorridos) {
      this.updateOrigenes();
      this.updateDestinos();
    }
  }

  public clear() {
    this.onFilterReset.emit();
  }

  private updateOrigenes() {
    const _origenes = this.iRecorridos.map(recorrido => ({
      id: recorrido.origenId,
      description: recorrido.origen
    }));

    const _ids = [...new Set(_origenes.map(o => o.id))];
    this.origenes = _ids.map(id => ({
      id,
      description: _origenes.find(o => o.id == id).description
    }));
  }

  private updateDestinos() {
    const _destinos = this.iRecorridos.map(recorrido => ({
      id: recorrido.destinoId,
      description: recorrido.destino
    }));

    const _ids = [...new Set(_destinos.map(o => o.id))];
    this.destinos = _ids.map(id => ({
      id,
      description: _destinos.find(o => o.id == id).description
    }));
  }
}
