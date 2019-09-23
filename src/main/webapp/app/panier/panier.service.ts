import {IPaniers} from "app/shared/model/paniers.model";
import {IAnimaux} from "app/shared/model/animaux.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PanierService implements IPaniers {

  id?: number;
  animauxes?: IAnimaux[];

  constructor() {
    this.animauxes=[];
  }

  getPanierId() {
    return this.id;
  }

  getAnimauxes() {
    return this.animauxes;
  }

  addAnimaux(a: IAnimaux) {
    this.animauxes.push(a);
  }
}
