import { Trayecto } from "./trayecto";
import {Retraso} from "./retraso";
export class Viaje {
    constructor() {}
    id: string;
    cantPasajeros: number;
    fechaHoraSalidaEstipuladas:string;
    fechaHoraLlegadaEstipuladas:string;
    fechaHoraRealSalida:string;
    fechaHoraRealLlegada:string;
    actual:boolean;
    estado:string;
    orden: number;
    trayecto: Trayecto;
    retrasos: Retraso[];
}