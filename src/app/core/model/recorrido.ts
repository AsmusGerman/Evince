import { Viaje } from "./viaje";
import { Trayecto } from "./trayecto";
/**
 * Un recorrido es una ruta de viaje
 * @class
 */
export class Recorrido {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public orden: number,
    public viajes: Array<Viaje>,
    public trayectos: Array<Trayecto>
  ) {}
}
