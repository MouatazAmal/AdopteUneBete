import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUtilisateurs } from 'app/shared/model/utilisateurs.model';

type EntityResponseType = HttpResponse<IUtilisateurs>;
type EntityArrayResponseType = HttpResponse<IUtilisateurs[]>;

@Injectable({ providedIn: 'root' })
export class UtilisateursService {
  public resourceUrl = SERVER_API_URL + 'api/utilisateurs';

  constructor(protected http: HttpClient) {}

  create(utilisateurs: IUtilisateurs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(utilisateurs);
    return this.http
      .post<IUtilisateurs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(utilisateurs: IUtilisateurs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(utilisateurs);
    return this.http
      .put<IUtilisateurs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUtilisateurs>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUtilisateurs[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(utilisateurs: IUtilisateurs): IUtilisateurs {
    const copy: IUtilisateurs = Object.assign({}, utilisateurs, {
      dateNaissance: utilisateurs.dateNaissance != null && utilisateurs.dateNaissance.isValid() ? utilisateurs.dateNaissance.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance != null ? moment(res.body.dateNaissance) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((utilisateurs: IUtilisateurs) => {
        utilisateurs.dateNaissance = utilisateurs.dateNaissance != null ? moment(utilisateurs.dateNaissance) : null;
      });
    }
    return res;
  }
}
