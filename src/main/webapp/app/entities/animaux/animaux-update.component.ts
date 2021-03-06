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
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAnimaux, Animaux } from 'app/shared/model/animaux.model';
import { AnimauxService } from './animaux.service';
import { IPaniers } from 'app/shared/model/paniers.model';
import { PaniersService } from 'app/entities/paniers/paniers.service';
import { ICommandes } from 'app/shared/model/commandes.model';
import { CommandesService } from 'app/entities/commandes/commandes.service';

@Component({
  selector: 'jhi-animaux-update',
  templateUrl: './animaux-update.component.html'
})
export class AnimauxUpdateComponent implements OnInit {
  isSaving: boolean;

  paniers: IPaniers[];

  commandes: ICommandes[];

  editForm = this.fb.group({
    id: [],
    nom: [],
    age: [],
    prix: [],
    description: [],
    statut: [],
    typeAnimal: [],
    sexe: [],
    poids: [],
    fertilite: [],
    dateAjout: [],
    image: [],
    imageContentType: [],
    paniers: [],
    commandes: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected animauxService: AnimauxService,
    protected paniersService: PaniersService,
    protected commandesService: CommandesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ animaux }) => {
      this.updateForm(animaux);
    });
    this.paniersService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPaniers[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPaniers[]>) => response.body)
      )
      .subscribe((res: IPaniers[]) => (this.paniers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.commandesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommandes[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommandes[]>) => response.body)
      )
      .subscribe((res: ICommandes[]) => (this.commandes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(animaux: IAnimaux) {
    this.editForm.patchValue({
      id: animaux.id,
      nom: animaux.nom,
      age: animaux.age,
      prix: animaux.prix,
      description: animaux.description,
      statut: animaux.statut,
      typeAnimal: animaux.typeAnimal,
      sexe: animaux.sexe,
      poids: animaux.poids,
      fertilite: animaux.fertilite,
      dateAjout: animaux.dateAjout != null ? animaux.dateAjout.format(DATE_TIME_FORMAT) : null,
      image: animaux.image,
      imageContentType: animaux.imageContentType,
      paniers: animaux.paniers,
      commandes: animaux.commandes
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const animaux = this.createFromForm();
    if (animaux.id !== undefined) {
      this.subscribeToSaveResponse(this.animauxService.update(animaux));
    } else {
      this.subscribeToSaveResponse(this.animauxService.create(animaux));
    }
  }

  private createFromForm(): IAnimaux {
    return {
      ...new Animaux(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      age: this.editForm.get(['age']).value,
      prix: this.editForm.get(['prix']).value,
      description: this.editForm.get(['description']).value,
      statut: this.editForm.get(['statut']).value,
      typeAnimal: this.editForm.get(['typeAnimal']).value,
      sexe: this.editForm.get(['sexe']).value,
      poids: this.editForm.get(['poids']).value,
      fertilite: this.editForm.get(['fertilite']).value,
      dateAjout:
        this.editForm.get(['dateAjout']).value != null ? moment(this.editForm.get(['dateAjout']).value, DATE_TIME_FORMAT) : undefined,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      paniers: this.editForm.get(['paniers']).value,
      commandes: this.editForm.get(['commandes']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnimaux>>) {
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

  trackCommandesById(index: number, item: ICommandes) {
    return item.id;
  }
}
