import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Commandes } from 'app/shared/model/commandes.model';
import { CommandesService } from './commandes.service';
import { CommandesComponent } from './commandes.component';
import { CommandesDetailComponent } from './commandes-detail.component';
import { CommandesUpdateComponent } from './commandes-update.component';
import { CommandesDeletePopupComponent } from './commandes-delete-dialog.component';
import { ICommandes } from 'app/shared/model/commandes.model';

@Injectable({ providedIn: 'root' })
export class CommandesResolve implements Resolve<ICommandes> {
  constructor(private service: CommandesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommandes> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Commandes>) => response.ok),
        map((commandes: HttpResponse<Commandes>) => commandes.body)
      );
    }
    return of(new Commandes());
  }
}

export const commandesRoute: Routes = [
  {
    path: '',
    component: CommandesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.commandes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CommandesDetailComponent,
    resolve: {
      commandes: CommandesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.commandes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CommandesUpdateComponent,
    resolve: {
      commandes: CommandesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.commandes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CommandesUpdateComponent,
    resolve: {
      commandes: CommandesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.commandes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const commandesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CommandesDeletePopupComponent,
    resolve: {
      commandes: CommandesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.commandes.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
