export interface UserStateModel {
  name: string;
  role: string;
  email: string;
}

export class Identify {
  static readonly type = "[User] Identify";
}

export class Identified {
  static readonly type = "[User] Identified";
  constructor(public payload: { name: string; role: string; email: string }) {}
}
