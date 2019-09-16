/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AubTestModule } from '../../../test.module';
import { PaniersDetailComponent } from 'app/entities/paniers/paniers-detail.component';
import { Paniers } from 'app/shared/model/paniers.model';

describe('Component Tests', () => {
  describe('Paniers Management Detail Component', () => {
    let comp: PaniersDetailComponent;
    let fixture: ComponentFixture<PaniersDetailComponent>;
    const route = ({ data: of({ paniers: new Paniers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [PaniersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PaniersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaniersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paniers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
