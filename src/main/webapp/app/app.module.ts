import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { AubSharedModule } from 'app/shared/shared.module';
import { AubCoreModule } from 'app/core/core.module';
import { AubAppRoutingModule } from './app-routing.module';
import { AubHomeModule } from './home/home.module';
import { AubEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatMenuModule } from '@angular/material/menu';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { MdMenuModule } from 'md-menu/menu';
import { NouveautesModule } from './nouveautes/nouveautes.module';
import { PoissonsModule } from './poissons/poissons.module';
import { ToutlesproduitsModule } from './toutlesproduits/toutlesproduits.module';
import { FelinsModule } from './felins/felins.module';
import { AutresModule } from './autres/autres.module';
import { ReptilesModule } from './reptiles/reptiles.module';
import { PanierModule } from './panier/panier.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { PaymentModule } from './payment/payment.module';
//import { ArticleModule } from './article/article.module';

@NgModule({
  imports: [
    BrowserModule,
    AubSharedModule.forRoot(),
    AubCoreModule,
    AubHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AubEntityModule,
    AubAppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    FlexLayoutModule,
    //MdMenuModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    DemoMaterialModule,
    NouveautesModule,
    PoissonsModule,
    ToutlesproduitsModule,
    FelinsModule,
    AutresModule,
    ReptilesModule,
    PanierModule,
    PaymentModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    //PaymentComponent
    //PoissonsComponent,
    //ToutlesproduitsComponent,
    //ReptilesComponent,
    //FelinsComponent,
    //AutresComponent,
    //PanierComponent
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
export class AubAppModule {}
