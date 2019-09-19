import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AubTestModule } from '../../../test.module';
import { PaniersDeleteDialogComponent } from 'app/entities/paniers/paniers-delete-dialog.component';
import { PaniersService } from 'app/entities/paniers/paniers.service';

describe('Component Tests', () => {
  describe('Paniers Management Delete Component', () => {
    let comp: PaniersDeleteDialogComponent;
    let fixture: ComponentFixture<PaniersDeleteDialogComponent>;
    let service: PaniersService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [PaniersDeleteDialogComponent]
      })
        .overrideTemplate(PaniersDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaniersDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaniersService);
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
