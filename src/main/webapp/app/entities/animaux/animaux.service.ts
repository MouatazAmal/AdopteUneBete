import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAnimaux } from 'app/shared/model/animaux.model';

type EntityResponseType = HttpResponse<IAnimaux>;
type EntityArrayResponseType = HttpResponse<IAnimaux[]>;

@Injectable({ providedIn: 'root' })
export class AnimauxService {
  public resourceUrl = SERVER_API_URL + 'api/animauxes';

  constructor(protected http: HttpClient) {}

  create(animaux: IAnimaux): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(animaux);
    return this.http
      .post<IAnimaux>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(animaux: IAnimaux): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(animaux);
    return this.http
      .put<IAnimaux>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAnimaux>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAnimaux[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(animaux: IAnimaux): IAnimaux {
    const copy: IAnimaux = Object.assign({}, animaux, {
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
      res.body.forEach((animaux: IAnimaux) => {
        animaux.dateAjout = animaux.dateAjout != null ? moment(animaux.dateAjout) : null;
      });
    }
    return res;
  }
}
