import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAnimaux } from 'app/shared/model/animaux.model';

type EntityResponseType = HttpResponse<IAnimaux>;
type EntityArrayResponseType = HttpResponse<IAnimaux[]>;

@Injectable({ providedIn: 'root' })
export class AnimauxService {
  public resourceUrl = SERVER_API_URL + 'api/animauxes';

  constructor(protected http: HttpClient) {}

  create(animaux: IAnimaux): Observable<EntityResponseType> {
    return this.http.post<IAnimaux>(this.resourceUrl, animaux, { observe: 'response' });
  }

  update(animaux: IAnimaux): Observable<EntityResponseType> {
    return this.http.put<IAnimaux>(this.resourceUrl, animaux, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnimaux>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnimaux[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
