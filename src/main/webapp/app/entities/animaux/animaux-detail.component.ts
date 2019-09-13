import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAnimaux } from 'app/shared/model/animaux.model';

@Component({
  selector: 'jhi-animaux-detail',
  templateUrl: './animaux-detail.component.html'
})
export class AnimauxDetailComponent implements OnInit {
  animaux: IAnimaux;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ animaux }) => {
      this.animaux = animaux;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
