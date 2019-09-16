import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPaniers } from 'app/shared/model/paniers.model';

type EntityResponseType = HttpResponse<IPaniers>;
type EntityArrayResponseType = HttpResponse<IPaniers[]>;

@Injectable({ providedIn: 'root' })
export class PaniersService {
  public resourceUrl = SERVER_API_URL + 'api/paniers';

  constructor(protected http: HttpClient) {}

  create(paniers: IPaniers): Observable<EntityResponseType> {
    return this.http.post<IPaniers>(this.resourceUrl, paniers, { observe: 'response' });
  }

  update(paniers: IPaniers): Observable<EntityResponseType> {
    return this.http.put<IPaniers>(this.resourceUrl, paniers, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaniers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaniers[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
