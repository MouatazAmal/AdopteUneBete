import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AubTestModule } from '../../../test.module';
import { UtilisateursDeleteDialogComponent } from 'app/entities/utilisateurs/utilisateurs-delete-dialog.component';
import { UtilisateursService } from 'app/entities/utilisateurs/utilisateurs.service';

describe('Component Tests', () => {
  describe('Utilisateurs Management Delete Component', () => {
    let comp: UtilisateursDeleteDialogComponent;
    let fixture: ComponentFixture<UtilisateursDeleteDialogComponent>;
    let service: UtilisateursService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [UtilisateursDeleteDialogComponent]
      })
        .overrideTemplate(UtilisateursDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UtilisateursDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtilisateursService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
