import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AubTestModule } from '../../../test.module';
import { UtilisateursUpdateComponent } from 'app/entities/utilisateurs/utilisateurs-update.component';
import { UtilisateursService } from 'app/entities/utilisateurs/utilisateurs.service';
import { Utilisateurs } from 'app/shared/model/utilisateurs.model';

describe('Component Tests', () => {
  describe('Utilisateurs Management Update Component', () => {
    let comp: UtilisateursUpdateComponent;
    let fixture: ComponentFixture<UtilisateursUpdateComponent>;
    let service: UtilisateursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [UtilisateursUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UtilisateursUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtilisateursUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtilisateursService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Utilisateurs(123);
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
        const entity = new Utilisateurs();
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
