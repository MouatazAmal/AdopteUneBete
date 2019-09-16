import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICommandes } from 'app/shared/model/commandes.model';
import { AccountService } from 'app/core';
import { CommandesService } from './commandes.service';

@Component({
  selector: 'jhi-commandes',
  templateUrl: './commandes.component.html'
})
export class CommandesComponent implements OnInit, OnDestroy {
  commandes: ICommandes[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected commandesService: CommandesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.commandesService
      .query()
      .pipe(
        filter((res: HttpResponse<ICommandes[]>) => res.ok),
        map((res: HttpResponse<ICommandes[]>) => res.body)
      )
      .subscribe(
        (res: ICommandes[]) => {
          this.commandes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCommandes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICommandes) {
    return item.id;
  }

  registerChangeInCommandes() {
    this.eventSubscriber = this.eventManager.subscribe('commandesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
