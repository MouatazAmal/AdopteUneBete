import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AubTestModule } from '../../../test.module';
import { CommandesDetailComponent } from 'app/entities/commandes/commandes-detail.component';
import { Commandes } from 'app/shared/model/commandes.model';

describe('Component Tests', () => {
  describe('Commandes Management Detail Component', () => {
    let comp: CommandesDetailComponent;
    let fixture: ComponentFixture<CommandesDetailComponent>;
    const route = ({ data: of({ commandes: new Commandes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AubTestModule],
        declarations: [CommandesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CommandesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommandesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.commandes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
