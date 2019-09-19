import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommandes } from 'app/shared/model/commandes.model';
import { CommandesService } from './commandes.service';

@Component({
  selector: 'jhi-commandes-delete-dialog',
  templateUrl: './commandes-delete-dialog.component.html'
})
export class CommandesDeleteDialogComponent {
  commandes: ICommandes;

  constructor(protected commandesService: CommandesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.commandesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'commandesListModification',
        content: 'Deleted an commandes'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-commandes-delete-popup',
  template: ''
})
export class CommandesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ commandes }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CommandesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.commandes = commandes;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/commandes', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/commandes', { outlets: { popup: null } }]);
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
