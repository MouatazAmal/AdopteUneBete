import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AubSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [AubSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [AubSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AubSharedModule {
  static forRoot() {
    return {
      ngModule: AubSharedModule
    };
  }
}
