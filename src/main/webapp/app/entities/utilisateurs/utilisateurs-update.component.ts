import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IUtilisateurs, Utilisateurs } from 'app/shared/model/utilisateurs.model';
import { UtilisateursService } from './utilisateurs.service';
import { IPaniers } from 'app/shared/model/paniers.model';
import { PaniersService } from 'app/entities/paniers';

@Component({
  selector: 'jhi-utilisateurs-update',
  templateUrl: './utilisateurs-update.component.html'
})
export class UtilisateursUpdateComponent implements OnInit {
  isSaving: boolean;

  paniers: IPaniers[];

  editForm = this.fb.group({
    id: [],
    numRue: [],
    nomRue: [],
    ville: [],
    codePostal: [],
    dateNaissance: [],
    paniers: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected utilisateursService: UtilisateursService,
    protected paniersService: PaniersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
  }

  updateForm(utilisateurs: IUtilisateurs) {
    this.editForm.patchValue({
      id: utilisateurs.id,
      numRue: utilisateurs.numRue,
      nomRue: utilisateurs.nomRue,
      ville: utilisateurs.ville,
      codePostal: utilisateurs.codePostal,
      dateNaissance: utilisateurs.dateNaissance != null ? utilisateurs.dateNaissance.format(DATE_TIME_FORMAT) : null,
      paniers: utilisateurs.paniers
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const utilisateurs = this.createFromForm();
    if (utilisateurs.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateursService.update(utilisateurs));
    } else {
      this.subscribeToSaveResponse(this.utilisateursService.create(utilisateurs));
    }
  }

  private createFromForm(): IUtilisateurs {
    return {
      ...new Utilisateurs(),
      id: this.editForm.get(['id']).value,
      numRue: this.editForm.get(['numRue']).value,
      nomRue: this.editForm.get(['nomRue']).value,
      ville: this.editForm.get(['ville']).value,
      codePostal: this.editForm.get(['codePostal']).value,
      dateNaissance:
        this.editForm.get(['dateNaissance']).value != null
          ? moment(this.editForm.get(['dateNaissance']).value, DATE_TIME_FORMAT)
          : undefined,
      paniers: this.editForm.get(['paniers']).value
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
}
