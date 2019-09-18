import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AubTestModule } from '../../../test.module';
import { UtilisateursComponent } from 'app/entities/utilisateurs/utilisateurs.component';
import { UtilisateursService } from 'app/entities/utilisateurs/utilisateurs.service';
import { Utilisateurs } from 'app/shared/model/utilisateurs.model';

describe('Component Tests', () => {
  describe('Utilisateurs Management Component', () => {
    let comp: UtilisateursComponent;
    let fixture: ComponentFixture<UtilisateursComponent>;
    let service: UtilisateursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [UtilisateursComponent],
        providers: []
      })
        .overrideTemplate(UtilisateursComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtilisateursComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtilisateursService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Utilisateurs(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.utilisateurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
