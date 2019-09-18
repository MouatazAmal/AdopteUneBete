import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICommandes } from 'app/shared/model/commandes.model';

type EntityResponseType = HttpResponse<ICommandes>;
type EntityArrayResponseType = HttpResponse<ICommandes[]>;

@Injectable({ providedIn: 'root' })
export class CommandesService {
  public resourceUrl = SERVER_API_URL + 'api/commandes';

  constructor(protected http: HttpClient) {}

  create(commandes: ICommandes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commandes);
    return this.http
      .post<ICommandes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(commandes: ICommandes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commandes);
    return this.http
      .put<ICommandes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommandes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommandes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(commandes: ICommandes): ICommandes {
    const copy: ICommandes = Object.assign({}, commandes, {
      dateCommande: commandes.dateCommande != null && commandes.dateCommande.isValid() ? commandes.dateCommande.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCommande = res.body.dateCommande != null ? moment(res.body.dateCommande) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((commandes: ICommandes) => {
        commandes.dateCommande = commandes.dateCommande != null ? moment(commandes.dateCommande) : null;
      });
    }
    return res;
  }
}
