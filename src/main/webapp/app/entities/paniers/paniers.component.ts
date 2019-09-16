import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPaniers } from 'app/shared/model/paniers.model';
import { AccountService } from 'app/core';
import { PaniersService } from './paniers.service';

@Component({
  selector: 'jhi-paniers',
  templateUrl: './paniers.component.html'
})
export class PaniersComponent implements OnInit, OnDestroy {
  paniers: IPaniers[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected paniersService: PaniersService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.paniersService
      .query()
      .pipe(
        filter((res: HttpResponse<IPaniers[]>) => res.ok),
        map((res: HttpResponse<IPaniers[]>) => res.body)
      )
      .subscribe(
        (res: IPaniers[]) => {
          this.paniers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPaniers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPaniers) {
    return item.id;
  }

  registerChangeInPaniers() {
    this.eventSubscriber = this.eventManager.subscribe('paniersListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
