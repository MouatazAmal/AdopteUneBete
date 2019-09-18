import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Animaux } from 'app/shared/model/animaux.model';
import { AnimauxService } from './animaux.service';
import { AnimauxComponent } from './animaux.component';
import { AnimauxDetailComponent } from './animaux-detail.component';
import { AnimauxUpdateComponent } from './animaux-update.component';
import { AnimauxDeletePopupComponent } from './animaux-delete-dialog.component';
import { IAnimaux } from 'app/shared/model/animaux.model';

@Injectable({ providedIn: 'root' })
export class AnimauxResolve implements Resolve<IAnimaux> {
  constructor(private service: AnimauxService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAnimaux> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Animaux>) => response.ok),
        map((animaux: HttpResponse<Animaux>) => animaux.body)
      );
    }
    return of(new Animaux());
  }
}

export const animauxRoute: Routes = [
  {
    path: '',
    component: AnimauxComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.animaux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AnimauxDetailComponent,
    resolve: {
      animaux: AnimauxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.animaux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AnimauxUpdateComponent,
    resolve: {
      animaux: AnimauxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.animaux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AnimauxUpdateComponent,
    resolve: {
      animaux: AnimauxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.animaux.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const animauxPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AnimauxDeletePopupComponent,
    resolve: {
      animaux: AnimauxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.animaux.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
