import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FiltersComponent } from '../components/filters/filters';
import { ExportComponent } from "../components/export/export";

import { ExportPage } from '../pages/export/export';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailCompanyPage } from '../pages/detail-company/detail-company';
import { TutorialPage } from "../pages/tutorial/tutorial";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { FirmApiProvider } from '../providers/firm-api/firm-api';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UrlService } from '../providers/url';
import { Vibration } from '@ionic-native/vibration';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    MyApp,
    ExportPage,
    MapPage,
    HomePage,
    TabsPage,
    TutorialPage,
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
    ExportPage,
    MapPage,
    HomePage,
    TabsPage,
    DetailCompanyPage,
    ExportComponent,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirmApiProvider,
    HttpClientModule,
    UrlService,
    Vibration
  ]
})
export class AppModule {}
