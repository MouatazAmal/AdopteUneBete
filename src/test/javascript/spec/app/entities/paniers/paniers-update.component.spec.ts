/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AubTestModule } from '../../../test.module';
import { PaniersUpdateComponent } from 'app/entities/paniers/paniers-update.component';
import { PaniersService } from 'app/entities/paniers/paniers.service';
import { Paniers } from 'app/shared/model/paniers.model';

describe('Component Tests', () => {
  describe('Paniers Management Update Component', () => {
    let comp: PaniersUpdateComponent;
    let fixture: ComponentFixture<PaniersUpdateComponent>;
    let service: PaniersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [PaniersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PaniersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaniersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaniersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Paniers(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Paniers();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
