import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnimaux } from 'app/shared/model/animaux.model';
import { AnimauxService } from './animaux.service';

@Component({
  selector: 'jhi-animaux-delete-dialog',
  templateUrl: './animaux-delete-dialog.component.html'
})
export class AnimauxDeleteDialogComponent {
  animaux: IAnimaux;

  constructor(protected animauxService: AnimauxService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.animauxService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'animauxListModification',
        content: 'Deleted an animaux'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-animaux-delete-popup',
  template: ''
})
export class AnimauxDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ animaux }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AnimauxDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.animaux = animaux;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/animaux', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/animaux', { outlets: { popup: null } }]);
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
