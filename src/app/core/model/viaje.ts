import { Trayecto } from "./trayecto";
import { Retraso } from "./retraso";
export class Viaje {
  constructor(
    public id: string,
    public nombre: string,
    public cantPasajeros: number,
    public fechaHoraSalidaEstipuladas: string,
    public fechaHoraLlegadaEstipuladas: string,
    public fechaHoraRealSalida: string,
    public fechaHoraRealLlegada: string,
    public actual: boolean,
    public siguiente: boolean,
    public estado: string,
    public orden: number,
    public trayecto: Trayecto,
    public retrasos: Array<Retraso>
  ) {}
}
