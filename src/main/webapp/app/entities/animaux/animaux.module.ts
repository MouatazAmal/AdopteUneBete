import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AubSharedModule } from 'app/shared';
import {
  AnimauxComponent,
  AnimauxDetailComponent,
  AnimauxUpdateComponent,
  AnimauxDeletePopupComponent,
  AnimauxDeleteDialogComponent,
  animauxRoute,
  animauxPopupRoute
} from './';

const ENTITY_STATES = [...animauxRoute, ...animauxPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AnimauxComponent,
    AnimauxDetailComponent,
    AnimauxUpdateComponent,
    AnimauxDeleteDialogComponent,
    AnimauxDeletePopupComponent
  ],
  entryComponents: [AnimauxComponent, AnimauxUpdateComponent, AnimauxDeleteDialogComponent, AnimauxDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AubAnimauxModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
