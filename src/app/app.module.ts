import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FiltersComponent } from '../components/filters/filters';
import { ExportComponent } from "../components/export/export";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailCompanyPage } from '../pages/detail-company/detail-company';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { FirmApiProvider } from '../providers/firm-api/firm-api';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UrlService } from '../providers/url';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailCompanyPage,
    FiltersComponent,
    ExportComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailCompanyPage,
    ExportComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirmApiProvider,
    HttpClientModule,
    UrlService
  ]
})
export class AppModule {}
