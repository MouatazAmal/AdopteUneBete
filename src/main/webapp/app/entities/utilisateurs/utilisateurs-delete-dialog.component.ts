import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUtilisateurs } from 'app/shared/model/utilisateurs.model';
import { UtilisateursService } from './utilisateurs.service';

@Component({
  selector: 'jhi-utilisateurs-delete-dialog',
  templateUrl: './utilisateurs-delete-dialog.component.html'
})
export class UtilisateursDeleteDialogComponent {
  utilisateurs: IUtilisateurs;

  constructor(
    protected utilisateursService: UtilisateursService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.utilisateursService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'utilisateursListModification',
        content: 'Deleted an utilisateurs'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-utilisateurs-delete-popup',
  template: ''
})
export class UtilisateursDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ utilisateurs }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UtilisateursDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.utilisateurs = utilisateurs;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/utilisateurs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/utilisateurs', { outlets: { popup: null } }]);
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
