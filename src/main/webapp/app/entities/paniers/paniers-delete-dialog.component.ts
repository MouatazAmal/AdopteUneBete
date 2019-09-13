import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaniers } from 'app/shared/model/paniers.model';
import { PaniersService } from './paniers.service';

@Component({
  selector: 'jhi-paniers-delete-dialog',
  templateUrl: './paniers-delete-dialog.component.html'
})
export class PaniersDeleteDialogComponent {
  paniers: IPaniers;

  constructor(protected paniersService: PaniersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paniersService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paniersListModification',
        content: 'Deleted an paniers'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-paniers-delete-popup',
  template: ''
})
export class PaniersDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paniers }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PaniersDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.paniers = paniers;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/paniers', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/paniers', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
