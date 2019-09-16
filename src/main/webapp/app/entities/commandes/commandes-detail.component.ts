import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommandes } from 'app/shared/model/commandes.model';

@Component({
  selector: 'jhi-commandes-detail',
  templateUrl: './commandes-detail.component.html'
})
export class CommandesDetailComponent implements OnInit {
  commandes: ICommandes;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ commandes }) => {
      this.commandes = commandes;
    });
  }

  previousState() {
    window.history.back();
  }
}
