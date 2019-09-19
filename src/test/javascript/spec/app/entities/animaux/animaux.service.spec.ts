import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AnimauxService } from 'app/entities/animaux/animaux.service';
import { IAnimaux, Animaux } from 'app/shared/model/animaux.model';
import { AnimalStatut } from 'app/shared/model/enumerations/animal-statut.model';
import { TypeAnimal } from 'app/shared/model/enumerations/type-animal.model';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';
import { Fertilite } from 'app/shared/model/enumerations/fertilite.model';

describe('Service Tests', () => {
  describe('Animaux Service', () => {
    let injector: TestBed;
    let service: AnimauxService;
    let httpMock: HttpTestingController;
    let elemDefault: IAnimaux;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AnimauxService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Animaux(
        0,
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        AnimalStatut.DISPONIBLE,
        TypeAnimal.POISSON,
        Sexe.MALE,
        0,
        Fertilite.STERILE,
        currentDate,
        'image/png',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateAjout: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Animaux', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateAjout: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateAjout: currentDate
          },
          returnedFromService
        );
        service
          .create(new Animaux(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Animaux', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            age: 1,
            prix: 1,
            description: 'BBBBBB',
            statut: 'BBBBBB',
            typeAnimal: 'BBBBBB',
            sexe: 'BBBBBB',
            poids: 1,
            fertilite: 'BBBBBB',
            dateAjout: currentDate.format(DATE_TIME_FORMAT),
            image: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAjout: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Animaux', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            age: 1,
            prix: 1,
            description: 'BBBBBB',
            statut: 'BBBBBB',
            typeAnimal: 'BBBBBB',
            sexe: 'BBBBBB',
            poids: 1,
            fertilite: 'BBBBBB',
            dateAjout: currentDate.format(DATE_TIME_FORMAT),
            image: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateAjout: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Animaux', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
