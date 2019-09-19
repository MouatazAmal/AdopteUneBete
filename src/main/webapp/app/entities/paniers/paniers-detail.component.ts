import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaniers } from 'app/shared/model/paniers.model';

@Component({
  selector: 'jhi-paniers-detail',
  templateUrl: './paniers-detail.component.html'
})
export class PaniersDetailComponent implements OnInit {
  paniers: IPaniers;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paniers }) => {
      this.paniers = paniers;
    });
  }

  previousState() {
    window.history.back();
  }
}
