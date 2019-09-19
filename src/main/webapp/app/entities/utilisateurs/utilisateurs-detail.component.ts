import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUtilisateurs } from 'app/shared/model/utilisateurs.model';

@Component({
  selector: 'jhi-utilisateurs-detail',
  templateUrl: './utilisateurs-detail.component.html'
})
export class UtilisateursDetailComponent implements OnInit {
  utilisateurs: IUtilisateurs;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ utilisateurs }) => {
      this.utilisateurs = utilisateurs;
    });
  }

  previousState() {
    window.history.back();
  }
}
