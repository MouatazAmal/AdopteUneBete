import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { Animaux } from 'app/shared/model/animaux.model';
import {AnimalStatut} from "app/shared/model/enumerations/animal-statut.model";

type EntityResponseType = HttpResponse<Animaux>;
type EntityArrayResponseType = HttpResponse<Animaux[]>;

@Injectable({ providedIn: 'root' })
export class AnimauxService {
  public resourceUrl = SERVER_API_URL + 'api/animauxes';

  constructor(protected http: HttpClient) {}

  create(animaux: Animaux): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(animaux);
    return this.http
      .post<Animaux>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(animaux: Animaux): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(animaux);
    return this.http
      .put<Animaux>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<Animaux>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findAnimal(id: number): Observable<Animaux> {
    return this.http
      .get<Animaux>(`${this.resourceUrl}/${id}`);
  }

  finAnimalByType(type: string ):Observable<any>{
    return this.http
      .get(`${this.resourceUrl}`,{params: { typeAnimal : type}});
  }

  finAnimalUnsoldByType(type: string ):Observable<any>{
    return this.http
      .get(`${this.resourceUrl}`,{params: { typeAnimal : type, animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}});
  }

  filtreByPrix(prixMin: number , prixMax : number , type:string ):Observable<any>{
    return this.http.get(`${this.resourceUrl}`,{params: { typeAnimal :type , prixMin : prixMin.toString() , prixMax : prixMax.toString(),animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}})
  }

  filtreByPrixAll(prixMin: number , prixMax : number):Observable<any>{
    return this.http.get(`${this.resourceUrl}`,{params: { prixMin : prixMin.toString() , prixMax : prixMax.toString(),animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}})
  }

  filtreByPrixPlus(prixMin: number, type : string):Observable<any>{
    return this.http.get(`${this.resourceUrl}`,{params: { typeAnimal : type , prixMin : prixMin.toString() , animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}})
  }

  filtreByPrixPlusAll(prixMin: number):Observable<any>{
    return this.http.get(`${this.resourceUrl}`,{params: { prixMin : prixMin.toString() , animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}})
  }

  filtreByAge(prixMin: number , prixMax : number):Observable<any>{
    return this.http.get(`${this.resourceUrl}`,{params: { ageMin : prixMin.toString() , ageMax : prixMax.toString(),animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}})
  }

  filtreBySexe(sexeAnimal:string):Observable<any>{
    return this.http
      .get(`${this.resourceUrl}`,{params: { sexe : sexeAnimal,animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}});
  }

  filtreBySexeType(sexeAnimal:string, type:string):Observable<any>{
    return this.http
      .get(`${this.resourceUrl}`,{params: { sexe : sexeAnimal ,typeAnimal : type,animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE }});
  }

  filtreBySexeTypeAnimal(sexeAnimal:string, type:string,prixMin: number , prixMax : number):Observable<any>{
    return this.http
      .get(`${this.resourceUrl}`,{params: { sexe : sexeAnimal ,typeAnimal : type , prixMin : prixMin.toString() , prixMax : prixMax.toString(),animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}});
  }

  findNewArrivals():Observable<any>{
    return this.http
      .get(`${this.resourceUrl}/${'new-arrivals'}`);
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<Animaux[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAnimauxList() : Observable<any> {
    return this.http
      .get(`${this.resourceUrl}`);
  }

  getAnimauxUnsoldList() : Observable<any> {
    return this.http
      .get(`${this.resourceUrl}`,{params:{animalStatut1 : AnimalStatut.DISPONIBLE , animalStatut2 : AnimalStatut.RESERVE}});
  }

  protected convertDateFromClient(animaux: Animaux): Animaux {
    const copy: Animaux = Object.assign({}, animaux, {
      dateAjout: animaux.dateAjout != null && animaux.dateAjout.isValid() ? animaux.dateAjout.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAjout = res.body.dateAjout != null ? moment(res.body.dateAjout) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((animaux: Animaux) => {
        animaux.dateAjout = animaux.dateAjout != null ? moment(animaux.dateAjout) : null;
      });
    }
    return res;
  }


}
