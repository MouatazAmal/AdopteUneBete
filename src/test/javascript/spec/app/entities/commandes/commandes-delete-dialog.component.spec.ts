/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AubTestModule } from '../../../test.module';
import { CommandesDeleteDialogComponent } from 'app/entities/commandes/commandes-delete-dialog.component';
import { CommandesService } from 'app/entities/commandes/commandes.service';

describe('Component Tests', () => {
  describe('Commandes Management Delete Component', () => {
    let comp: CommandesDeleteDialogComponent;
    let fixture: ComponentFixture<CommandesDeleteDialogComponent>;
    let service: CommandesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [CommandesDeleteDialogComponent]
      })
        .overrideTemplate(CommandesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommandesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommandesService);
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
