import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AubSharedModule } from 'app/shared';
import {
  PaniersComponent,
  PaniersDetailComponent,
  PaniersUpdateComponent,
  PaniersDeletePopupComponent,
  PaniersDeleteDialogComponent,
  paniersRoute,
  paniersPopupRoute
} from './';

const ENTITY_STATES = [...paniersRoute, ...paniersPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PaniersComponent,
    PaniersDetailComponent,
    PaniersUpdateComponent,
    PaniersDeleteDialogComponent,
    PaniersDeletePopupComponent
  ],
  entryComponents: [PaniersComponent, PaniersUpdateComponent, PaniersDeleteDialogComponent, PaniersDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AubPaniersModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
