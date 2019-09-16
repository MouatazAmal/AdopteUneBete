import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { AubSharedModule } from 'app/shared';
import { AubCoreModule } from 'app/core';
import { AubAppRoutingModule } from './app-routing.module';
import { AubHomeModule } from './home/home.module';
import { AubAccountModule } from './account/account.module';
import { AubEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { MatMenuModule } from '@angular/material/menu';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdMenuModule } from 'md-menu/menu';
import { NouveautesComponent } from './nouveautes/nouveautes.component';
import { PoissonsComponent } from './poissons/poissons.component';
import { ToutlesproduitsComponent } from './toutlesproduits/toutlesproduits.component';
import { FelinsComponent } from './felins/felins.component';
import { AutresComponent } from './autres/autres.component';
import { ReptilesComponent } from './reptiles/reptiles.component';
import { PanierComponent } from './panier/panier.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'fr'
    }),
    AubSharedModule.forRoot(),
    AubCoreModule,
    AubHomeModule,
    AubAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AubEntityModule,
    AubAppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    FlexLayoutModule,
    MdMenuModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    NouveautesComponent,
    PoissonsComponent,
    ToutlesproduitsComponent,
    ReptilesComponent,
    FelinsComponent,
    AutresComponent,
    PanierComponent,
    ArticleComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class AubAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
