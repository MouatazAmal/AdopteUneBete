import { NgModule } from '@angular/core';
import { AubSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

import { ArticleComponent } from 'app/article/article.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [AubSharedLibsModule, MDBBootstrapModule],
  declarations: [
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    ArticleComponent
  ],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    AubSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    ArticleComponent
  ]
})
export class AubSharedModule {
  static forRoot() {
    return {
      ngModule: AubSharedModule
    };
  }
}
