/**
 * Es el camino que une dos terminales
 * @class
  */
export class Trayecto {
  constructor(
    public id: number,
    public terminalOrigen: string,
    public terminalOrigenCodigo: string,
    public termianlOrigenId: number,
    public terminalDestino: string,
    public terminalDestinoCodigo: string,
    public terminalDestinoId: number
  ) {}
}
