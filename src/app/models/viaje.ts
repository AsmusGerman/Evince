import { Trayecto } from "./trayecto";
import {Retraso} from "./retraso";
export class Viaje {
    id: string;
    cantPasajeros: number;
    diaSalida:string;
    diaLlegada:string;
    horaEstipuladaSalida:string;
    horaEstipuladaLlegada:string;
    horaRealSalida:string;
    horaRealLlegada:string;
    recorridoId:string;
    trayecto: Trayecto;
    retrasos: Retraso[];
} 