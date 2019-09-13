/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AubTestModule } from '../../../test.module';
import { UtilisateursDetailComponent } from 'app/entities/utilisateurs/utilisateurs-detail.component';
import { Utilisateurs } from 'app/shared/model/utilisateurs.model';

describe('Component Tests', () => {
  describe('Utilisateurs Management Detail Component', () => {
    let comp: UtilisateursDetailComponent;
    let fixture: ComponentFixture<UtilisateursDetailComponent>;
    const route = ({ data: of({ utilisateurs: new Utilisateurs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [UtilisateursDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UtilisateursDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UtilisateursDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.utilisateurs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
