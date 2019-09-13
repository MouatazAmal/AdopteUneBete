import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Paniers } from 'app/shared/model/paniers.model';
import { PaniersService } from './paniers.service';
import { PaniersComponent } from './paniers.component';
import { PaniersDetailComponent } from './paniers-detail.component';
import { PaniersUpdateComponent } from './paniers-update.component';
import { PaniersDeletePopupComponent } from './paniers-delete-dialog.component';
import { IPaniers } from 'app/shared/model/paniers.model';

@Injectable({ providedIn: 'root' })
export class PaniersResolve implements Resolve<IPaniers> {
  constructor(private service: PaniersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaniers> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Paniers>) => response.ok),
        map((paniers: HttpResponse<Paniers>) => paniers.body)
      );
    }
    return of(new Paniers());
  }
}

export const paniersRoute: Routes = [
  {
    path: '',
    component: PaniersComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.paniers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PaniersDetailComponent,
    resolve: {
      paniers: PaniersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.paniers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PaniersUpdateComponent,
    resolve: {
      paniers: PaniersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.paniers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PaniersUpdateComponent,
    resolve: {
      paniers: PaniersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.paniers.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paniersPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PaniersDeletePopupComponent,
    resolve: {
      paniers: PaniersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aubApp.paniers.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
