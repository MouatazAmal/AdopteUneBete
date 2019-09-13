import { Moment } from 'moment';
import { IPaniers } from 'app/shared/model/paniers.model';
import { ICommandes } from 'app/shared/model/commandes.model';

export interface IUtilisateurs {
  id?: number;
  numRue?: number;
  nomRue?: string;
  ville?: string;
  codePostal?: number;
  dateNaissance?: Moment;
  paniers?: IPaniers;
  commandes?: ICommandes[];
}

export class Utilisateurs implements IUtilisateurs {
  constructor(
    public id?: number,
    public numRue?: number,
    public nomRue?: string,
    public ville?: string,
    public codePostal?: number,
    public dateNaissance?: Moment,
    public paniers?: IPaniers,
    public commandes?: ICommandes[]
  ) {}
}
