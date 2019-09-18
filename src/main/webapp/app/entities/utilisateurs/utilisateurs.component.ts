import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUtilisateurs } from 'app/shared/model/utilisateurs.model';
import { AccountService } from 'app/core/auth/account.service';
import { UtilisateursService } from './utilisateurs.service';

@Component({
  selector: 'jhi-utilisateurs',
  templateUrl: './utilisateurs.component.html'
})
export class UtilisateursComponent implements OnInit, OnDestroy {
  utilisateurs: IUtilisateurs[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected utilisateursService: UtilisateursService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.utilisateursService
      .query()
      .pipe(
        filter((res: HttpResponse<IUtilisateurs[]>) => res.ok),
        map((res: HttpResponse<IUtilisateurs[]>) => res.body)
      )
      .subscribe(
        (res: IUtilisateurs[]) => {
          this.utilisateurs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUtilisateurs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUtilisateurs) {
    return item.id;
  }

  registerChangeInUtilisateurs() {
    this.eventSubscriber = this.eventManager.subscribe('utilisateursListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
