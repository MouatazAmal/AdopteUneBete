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
import { ICommandes, Commandes } from 'app/shared/model/commandes.model';
import { CommandesService } from './commandes.service';
import { IUtilisateurs } from 'app/shared/model/utilisateurs.model';
import { UtilisateursService } from 'app/entities/utilisateurs/utilisateurs.service';

@Component({
  selector: 'jhi-commandes-update',
  templateUrl: './commandes-update.component.html'
})
export class CommandesUpdateComponent implements OnInit {
  isSaving: boolean;

  utilisateurs: IUtilisateurs[];

  editForm = this.fb.group({
    id: [],
    dateCommande: [],
    statut: [],
    utilisateurs: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected commandesService: CommandesService,
    protected utilisateursService: UtilisateursService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ commandes }) => {
      this.updateForm(commandes);
    });
    this.utilisateursService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUtilisateurs[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUtilisateurs[]>) => response.body)
      )
      .subscribe((res: IUtilisateurs[]) => (this.utilisateurs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(commandes: ICommandes) {
    this.editForm.patchValue({
      id: commandes.id,
      dateCommande: commandes.dateCommande != null ? commandes.dateCommande.format(DATE_TIME_FORMAT) : null,
      statut: commandes.statut,
      utilisateurs: commandes.utilisateurs
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const commandes = this.createFromForm();
    if (commandes.id !== undefined) {
      this.subscribeToSaveResponse(this.commandesService.update(commandes));
    } else {
      this.subscribeToSaveResponse(this.commandesService.create(commandes));
    }
  }

  private createFromForm(): ICommandes {
    return {
      ...new Commandes(),
      id: this.editForm.get(['id']).value,
      dateCommande:
        this.editForm.get(['dateCommande']).value != null ? moment(this.editForm.get(['dateCommande']).value, DATE_TIME_FORMAT) : undefined,
      statut: this.editForm.get(['statut']).value,
      utilisateurs: this.editForm.get(['utilisateurs']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommandes>>) {
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

  trackUtilisateursById(index: number, item: IUtilisateurs) {
    return item.id;
  }
}
