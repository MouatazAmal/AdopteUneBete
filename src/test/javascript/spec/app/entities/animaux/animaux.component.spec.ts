/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AubTestModule } from '../../../test.module';
import { AnimauxComponent } from 'app/entities/animaux/animaux.component';
import { AnimauxService } from 'app/entities/animaux/animaux.service';
import { Animaux } from 'app/shared/model/animaux.model';

describe('Component Tests', () => {
  describe('Animaux Management Component', () => {
    let comp: AnimauxComponent;
    let fixture: ComponentFixture<AnimauxComponent>;
    let service: AnimauxService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [AnimauxComponent],
        providers: []
      })
        .overrideTemplate(AnimauxComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnimauxComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnimauxService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Animaux(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.animauxes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
