import { Trayecto } from "./trayecto";
export interface Viaje {
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
} 