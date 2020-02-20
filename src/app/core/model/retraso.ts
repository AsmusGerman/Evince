/**
 * Un retraso detalla la causa por la cual un viaje se ve retrasado
 * @class
*/
export class Retraso {
  constructor(
    public id: string,
    public tipo: string,
    public descripcion: string,
    public tiempo: number
  ) {}
}
