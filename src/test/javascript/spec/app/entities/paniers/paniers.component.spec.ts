import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AubTestModule } from '../../../test.module';
import { PaniersComponent } from 'app/entities/paniers/paniers.component';
import { PaniersService } from 'app/entities/paniers/paniers.service';
import { Paniers } from 'app/shared/model/paniers.model';

describe('Component Tests', () => {
  describe('Paniers Management Component', () => {
    let comp: PaniersComponent;
    let fixture: ComponentFixture<PaniersComponent>;
    let service: PaniersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [PaniersComponent],
        providers: []
      })
        .overrideTemplate(PaniersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaniersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaniersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Paniers(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paniers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
