
export class SetSol {
  static readonly type = '[filter] Set Start Time';
  constructor(public payload: number) {}
}
export class SetCamera {
  static readonly type = '[filter] Set End Time';
  constructor(public payload: string) {}
}
export class SetPage {
  static readonly type = '[filter] Set Min Price';
  constructor(public payload: number) {}
}
export class FilterChange {
  static readonly type = '[app] Filter Change';
  constructor() {}
}
export class FilterClear {
  static readonly type = '[filter] Filter Clear';
  constructor() {}
}
export class GetPhotosByParameters {
  static readonly type = '[filter] Get Filtered Workshops';
  constructor(public payload: any) {}
}
