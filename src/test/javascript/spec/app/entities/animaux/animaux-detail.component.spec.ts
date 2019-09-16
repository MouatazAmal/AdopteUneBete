/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AubTestModule } from '../../../test.module';
import { AnimauxDetailComponent } from 'app/entities/animaux/animaux-detail.component';
import { Animaux } from 'app/shared/model/animaux.model';

describe('Component Tests', () => {
  describe('Animaux Management Detail Component', () => {
    let comp: AnimauxDetailComponent;
    let fixture: ComponentFixture<AnimauxDetailComponent>;
    const route = ({ data: of({ animaux: new Animaux(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [AnimauxDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AnimauxDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnimauxDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.animaux).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
