import { Moment } from 'moment';
import { IPaniers } from 'app/shared/model/paniers.model';
import { ICommandes } from 'app/shared/model/commandes.model';
import { AnimalStatut } from 'app/shared/model/enumerations/animal-statut.model';
import { TypeAnimal } from 'app/shared/model/enumerations/type-animal.model';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';
import { Fertilite } from 'app/shared/model/enumerations/fertilite.model';

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
  dateAjout?: Moment;
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
    public dateAjout?: Moment,
    public imageContentType?: string,
    public image?: any,
    public paniers?: IPaniers,
    public commandes?: ICommandes
  ) {}

  set changeStatut(statut:AnimalStatut){
    this.statut=statut;
  }
}
