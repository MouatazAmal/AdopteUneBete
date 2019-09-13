import { IPaniers } from 'app/shared/model/paniers.model';
import { ICommandes } from 'app/shared/model/commandes.model';

export const enum AnimalStatut {
  DISPONIBLE = 'DISPONIBLE',
  RESERVE = 'RESERVE',
  VENDU = 'VENDU'
}

export const enum TypeAnimal {
  POISSON = 'POISSON',
  REPTILE = 'REPTILE',
  FELIN = 'FELIN',
  CANIDE = 'CANIDE',
  AUTRES = 'AUTRES'
}

export const enum Sexe {
  MALE = 'MALE',
  FEMELLE = 'FEMELLE',
  HERMAPHRODITE = 'HERMAPHRODITE'
}

export const enum Fertilite {
  STERILE = 'STERILE',
  CASTRE = 'CASTRE',
  FERTILE = 'FERTILE'
}

export interface IAnimaux {
  id?: number;
  nom?: string;
  age?: number;
  prix?: number;
  description?: any;
  statut?: AnimalStatut;
  typeAnimal?: TypeAnimal;
  sexe?: Sexe;
  poids?: number;
  fertilite?: Fertilite;
  imageContentType?: string;
  image?: any;
  paniers?: IPaniers;
  commandes?: ICommandes;
}

export class Animaux implements IAnimaux {
  constructor(
    public id?: number,
    public nom?: string,
    public age?: number,
    public prix?: number,
    public description?: any,
    public statut?: AnimalStatut,
    public typeAnimal?: TypeAnimal,
    public sexe?: Sexe,
    public poids?: number,
    public fertilite?: Fertilite,
    public imageContentType?: string,
    public image?: any,
    public paniers?: IPaniers,
    public commandes?: ICommandes
  ) {}
}
