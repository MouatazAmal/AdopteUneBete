import {IPaniers} from "app/shared/model/paniers.model";
import {Animaux, IAnimaux} from "app/shared/model/animaux.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PanierService implements IPaniers {

  id?: number;
  animauxes?: Animaux[];

  constructor() {
    this.animauxes=[];
  }

  getPanierId() {
    return this.id;
  }

  getAnimauxes() {
    return this.animauxes;
  }

  addAnimaux(a: Animaux) {
    this.animauxes.push(a);
  }

  supAnimaux(idA : number ){
    let i : number;
    for(i=0; i < this.animauxes.length; i++){
      if(this.animauxes[i].id === idA){
         this.animauxes.splice(i, 1);
         break;
      }
    }
  }
}
