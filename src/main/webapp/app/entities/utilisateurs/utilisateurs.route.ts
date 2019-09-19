import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Utilisateurs } from 'app/shared/model/utilisateurs.model';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursComponent } from './utilisateurs.component';
import { UtilisateursDetailComponent } from './utilisateurs-detail.component';
import { UtilisateursUpdateComponent } from './utilisateurs-update.component';
import { UtilisateursDeletePopupComponent } from './utilisateurs-delete-dialog.component';
import { IUtilisateurs } from 'app/shared/model/utilisateurs.model';

@Injectable({ providedIn: 'root' })
export class UtilisateursResolve implements Resolve<IUtilisateurs> {
  constructor(private service: UtilisateursService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUtilisateurs> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Utilisateurs>) => response.ok),
        map((utilisateurs: HttpResponse<Utilisateurs>) => utilisateurs.body)
      );
    }
    return of(new Utilisateurs());
  }
}

export const utilisateursRoute: Routes = [
  {
    path: '',
    component: UtilisateursComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.utilisateurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UtilisateursDetailComponent,
    resolve: {
      utilisateurs: UtilisateursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.utilisateurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UtilisateursUpdateComponent,
    resolve: {
      utilisateurs: UtilisateursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.utilisateurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UtilisateursUpdateComponent,
    resolve: {
      utilisateurs: UtilisateursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.utilisateurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const utilisateursPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UtilisateursDeletePopupComponent,
    resolve: {
      utilisateurs: UtilisateursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.utilisateurs.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
