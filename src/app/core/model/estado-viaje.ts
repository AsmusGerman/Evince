import { Enumerable } from "./abstractions/enumberable";

/**
 * Representa uno de los estados de un viaje en un momento especifico
 * @enum
 */
export enum EstadoViaje {
  "pendiente" = 0,
  "actual" = 1,
  "finalizado" = 2
}
