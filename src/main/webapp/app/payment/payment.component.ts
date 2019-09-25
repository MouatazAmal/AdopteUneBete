import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IUtilisateurs, Utilisateurs } from 'app/shared/model/utilisateurs.model';
import { UtilisateursService } from '../entities/utilisateurs/utilisateurs.service';
import { IPaniers } from 'app/shared/model/paniers.model';
import { PaniersService } from 'app/entities/paniers/paniers.service';
import {IUser, User} from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-utilisateurs-update',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  isSaving: boolean;

  paniers: IPaniers[];

  users: IUser[];

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
    protected paniersService: PaniersService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}


  retourPanier(){
    //this.router.navigate(['../home']);
    window.history.back();
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ utilisateurs }) => {
      this.updateForm(utilisateurs);
    });
    this.paniersService
      .query({ filter: 'utilisateurs-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPaniers[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPaniers[]>) => response.body)
      )
      .subscribe(
        (res: IPaniers[]) => {
          if (!this.editForm.get('paniers').value || !this.editForm.get('paniers').value.id) {
            this.paniers = res;
          } else {
            this.paniersService
              .find(this.editForm.get('paniers').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPaniers>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPaniers>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPaniers) => (this.paniers = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
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
    this.subscribeToSaveResponse(this.userService.update(myuser));
    if (utilisateurs.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateursService.update(utilisateurs));
    } else {
      this.subscribeToSaveResponse(this.utilisateursService.create(utilisateurs));
    }
  }
  goFinishPayement() {
    // console.log(this.articleItem);
    // this.stateService.data = this.articleItem; , { state: this.articleItem }
    this.router.navigate(['../finishPayment']);
  }

  private createFromForm(): IUtilisateurs {
    return {
      ...new Utilisateurs(),
      id: this.editForm.get(['user']).value,
      numRue: this.editForm.get(['numRue']).value,
      nomRue: this.editForm.get(['nomRue']).value,
      ville: this.editForm.get(['ville']).value,
      codePostal: this.editForm.get(['codePostal']).value,
      dateNaissance:
        this.editForm.get(['dateNaissance']).value != null
          ? moment(this.editForm.get(['dateNaissance']).value, DATE_TIME_FORMAT)
          : undefined,
      paniers: this.editForm.get(['paniers']).value,
      user: this.editForm.get(['user']).value
    };
  }

  private getUser(){
    const uid = this.editForm.get(['id']).value;
    this.userService.getUser(uid).subscribe(data => { this.users = data; });
  }

  private createFromFormUser(): User {
    this.getUser();
    return {
      ...new User(),
      login:this.users[0].login,
      firstName: this.editForm.get(['firstName']).value,
      lastName:this.editForm.get(['lastName']).value,
      email:this.users[0].email,
      activated:this.users[0].activated,
      langKey: this.users[0].langKey,
      authorities: this.users[0].authorities,
      createdBy: this.users[0].createdBy,
      createdDate: this.users[0].createdDate,
      lastModifiedBy: this.users[0].lastModifiedBy,
      lastModifiedDate: this.users[0].lastModifiedDate,
      password: this.users[0].password,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateurs>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
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
