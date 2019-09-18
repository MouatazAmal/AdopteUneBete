import { Moment } from 'moment';
import { IAnimaux } from 'app/shared/model/animaux.model';
import { IUtilisateurs } from 'app/shared/model/utilisateurs.model';
import { CommandeStatut } from 'app/shared/model/enumerations/commande-statut.model';

export interface ICommandes {
  id?: number;
  dateCommande?: Moment;
  statut?: CommandeStatut;
  animauxes?: IAnimaux[];
  utilisateurs?: IUtilisateurs;
}

export class Commandes implements ICommandes {
  constructor(
    public id?: number,
    public dateCommande?: Moment,
    public statut?: CommandeStatut,
    public animauxes?: IAnimaux[],
    public utilisateurs?: IUtilisateurs
  ) {}
}
