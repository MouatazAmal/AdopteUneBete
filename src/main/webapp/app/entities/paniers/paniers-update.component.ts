import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPaniers, Paniers } from 'app/shared/model/paniers.model';
import { PaniersService } from './paniers.service';

@Component({
  selector: 'jhi-paniers-update',
  templateUrl: './paniers-update.component.html'
})
export class PaniersUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected paniersService: PaniersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ paniers }) => {
      this.updateForm(paniers);
    });
  }

  updateForm(paniers: IPaniers) {
    this.editForm.patchValue({
      id: paniers.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const paniers = this.createFromForm();
    if (paniers.id !== undefined) {
      this.subscribeToSaveResponse(this.paniersService.update(paniers));
    } else {
      this.subscribeToSaveResponse(this.paniersService.create(paniers));
    }
  }

  private createFromForm(): IPaniers {
    return {
      ...new Paniers(),
      id: this.editForm.get(['id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaniers>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
