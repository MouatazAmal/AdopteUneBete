import { IAnimaux } from 'app/shared/model/animaux.model';

export interface IPaniers {
  id?: number;
  animauxes?: IAnimaux[];
}

export class Paniers implements IPaniers {
  constructor(public id?: number, public animauxes?: IAnimaux[]) {}
}
