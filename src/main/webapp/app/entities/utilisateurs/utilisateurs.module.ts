import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AubSharedModule } from 'app/shared';
import {
  UtilisateursComponent,
  UtilisateursDetailComponent,
  UtilisateursUpdateComponent,
  UtilisateursDeletePopupComponent,
  UtilisateursDeleteDialogComponent,
  utilisateursRoute,
  utilisateursPopupRoute
} from './';

const ENTITY_STATES = [...utilisateursRoute, ...utilisateursPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UtilisateursComponent,
    UtilisateursDetailComponent,
    UtilisateursUpdateComponent,
    UtilisateursDeleteDialogComponent,
    UtilisateursDeletePopupComponent
  ],
  entryComponents: [
    UtilisateursComponent,
    UtilisateursUpdateComponent,
    UtilisateursDeleteDialogComponent,
    UtilisateursDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AubUtilisateursModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
