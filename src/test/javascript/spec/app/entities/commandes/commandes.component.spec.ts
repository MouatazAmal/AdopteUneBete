/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AubTestModule } from '../../../test.module';
import { CommandesComponent } from 'app/entities/commandes/commandes.component';
import { CommandesService } from 'app/entities/commandes/commandes.service';
import { Commandes } from 'app/shared/model/commandes.model';

describe('Component Tests', () => {
  describe('Commandes Management Component', () => {
    let comp: CommandesComponent;
    let fixture: ComponentFixture<CommandesComponent>;
    let service: CommandesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [CommandesComponent],
        providers: []
      })
        .overrideTemplate(CommandesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommandesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommandesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Commandes(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.commandes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
