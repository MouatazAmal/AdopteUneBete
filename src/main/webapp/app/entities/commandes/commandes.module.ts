import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AubSharedModule } from 'app/shared';
import {
  CommandesComponent,
  CommandesDetailComponent,
  CommandesUpdateComponent,
  CommandesDeletePopupComponent,
  CommandesDeleteDialogComponent,
  commandesRoute,
  commandesPopupRoute
} from './';

const ENTITY_STATES = [...commandesRoute, ...commandesPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CommandesComponent,
    CommandesDetailComponent,
    CommandesUpdateComponent,
    CommandesDeleteDialogComponent,
    CommandesDeletePopupComponent
  ],
  entryComponents: [CommandesComponent, CommandesUpdateComponent, CommandesDeleteDialogComponent, CommandesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AubCommandesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
