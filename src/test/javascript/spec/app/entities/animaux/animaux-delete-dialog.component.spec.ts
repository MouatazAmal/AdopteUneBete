import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AubTestModule } from '../../../test.module';
import { AnimauxDeleteDialogComponent } from 'app/entities/animaux/animaux-delete-dialog.component';
import { AnimauxService } from 'app/entities/animaux/animaux.service';

describe('Component Tests', () => {
  describe('Animaux Management Delete Component', () => {
    let comp: AnimauxDeleteDialogComponent;
    let fixture: ComponentFixture<AnimauxDeleteDialogComponent>;
    let service: AnimauxService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [AnimauxDeleteDialogComponent]
      })
        .overrideTemplate(AnimauxDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnimauxDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnimauxService);
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
