import { Viaje } from "src/app/core/model/viaje";
import { Recorrido } from "src/app/core/model/recorrido";

export interface DriverStateModel {
  travel: Viaje | null;
  route: Recorrido | null;
}

export class StartTravel {
  static readonly type = "[Driver] StartTravel";
  constructor(public payload: { travel: number; route: number }) {}
}

export class StopTravel {
  static readonly type = "[Driver] StopTravel";
  constructor(public payload: { travel: number; }) {}
}

export class NewDelay {
  static readonly type = "[Driver] NewDelay";
  constructor(public payload: { type: number, timestamp: string, description: string }) {}
}
