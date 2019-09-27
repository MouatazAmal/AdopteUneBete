import {Component, OnInit} from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import {JhiAlertService} from 'ng-jhipster';
import {IUtilisateurs, Utilisateurs} from 'app/shared/model/utilisateurs.model';
import {UtilisateursService} from '../entities/utilisateurs/utilisateurs.service';
import {IPaniers} from 'app/shared/model/paniers.model';
import {IUser, User} from 'app/core/user/user.model';
import {UserService} from 'app/core/user/user.service';
import {CommandesService} from "app/entities/commandes/commandes.service";
import {Commandes} from "app/shared/model/commandes.model";
import {PanierService} from "app/panier/panier.service";
import {CommandeStatut} from "app/shared/model/enumerations/commande-statut.model";

@Component({
  selector: 'jhi-utilisateurs-update',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  isSaving: boolean;

  paniers: IPaniers[];


  myAccount : HttpResponse<IUser>;

  editForm = this.fb.group({
    id: [],
    firstName:[],
    lastName:[],
    numRue: [],
    nomRue: [],
    ville: [],
    codePostal: [],
    dateNaissance: [],
    paniers: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected utilisateursService: UtilisateursService,
    private panierService : PanierService,
    protected userService: UserService,
    protected commandesService: CommandesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
  }


  retourPanier(){
    //this.router.navigate(['../home']);
    window.history.back();
  }

  ngOnInit() {
    this.userService.getMyAccount().subscribe(data => {this.myAccount = data; });
  }

  updateForm(utilisateurs: IUtilisateurs) {
    this.editForm.patchValue({
      id: utilisateurs.id,
      numRue: utilisateurs.numRue,
      nomRue: utilisateurs.nomRue,
      ville: utilisateurs.ville,
      codePostal: utilisateurs.codePostal,
      dateNaissance: utilisateurs.dateNaissance != null ? utilisateurs.dateNaissance.format(DATE_TIME_FORMAT) : null,
      paniers: utilisateurs.paniers,
      user: utilisateurs.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const utilisateurs = this.createFromForm();
    const myuser = this.createFromFormUser();
    // eslint-disable-next-line no-console
    this.userService.update(myuser).subscribe((data)=> console.log(data) );
    if ( utilisateurs.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateursService.update(utilisateurs));
    } else {
      this.subscribeToSaveResponse(this.utilisateursService.create(utilisateurs));
    }
    this.createCommande();
    this.router.navigate(['../finishPayment']);
  }

  private createCommande(){
    const commande = this.createFromFormCommande();
    // eslint-disable-next-line no-console
    this.commandesService.create(commande).subscribe((data) => this.onSaveSuccess(), () => this.onSaveError());
    this.panierService.animauxes=[];
  }
  private createFromForm(): IUtilisateurs {
    return {
      ...new Utilisateurs(),
      id: this.myAccount.body.id,
      numRue: this.editForm.get(['numRue']).value,
      nomRue: this.editForm.get(['nomRue']).value,
      ville: this.editForm.get(['ville']).value,
      codePostal: this.editForm.get(['codePostal']).value,
      dateNaissance:
        this.editForm.get(['dateNaissance']).value != null
          ? moment(this.editForm.get(['dateNaissance']).value, DATE_TIME_FORMAT)
          : undefined,
      paniers: this.editForm.get(['paniers']).value,
      user: this.myAccount.body.id
    };
  }

  private createFromFormUser(): User {
    return {
      ...new User(),
      id:this.myAccount.body.id,
      login:this.myAccount.body.login,
      firstName: this.editForm.get(['firstName']).value,
      lastName:this.editForm.get(['lastName']).value,
      email:this.myAccount.body.email,
      activated:this.myAccount.body.activated,
      langKey: this.myAccount.body.langKey,
      authorities: this.myAccount.body.authorities,
      createdBy: this.myAccount.body.createdBy,
      createdDate: this.myAccount.body.createdDate,
      lastModifiedBy: this.myAccount.body.lastModifiedBy,
      lastModifiedDate: this.myAccount.body.lastModifiedDate,
      password: this.myAccount.body.password,
    };
  }

  private createFromFormCommande(): Commandes {
    return {
      ...new Commandes(),
      animauxes:this.panierService.animauxes,
      statut:CommandeStatut.NON_CONFIRMEE
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateurs>>) {
    result.subscribe((data) => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    //this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPaniersById(index: number, item: IPaniers) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
