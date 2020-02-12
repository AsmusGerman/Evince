import { Viaje } from "./viaje";
export class Recorrido {
  constructor(
    public id: number,
    public nombre: string,
    public orden: number,
    public viajes: Array<Viaje>
  ) {}
}
