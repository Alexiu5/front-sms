import { GamePage } from './../pages/game/game';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ValidateUserPage } from './../pages/validate-user/validate-user';
import { RegisterPage } from './../pages/register/register';
import { ClaimPricePage } from './../pages/claim-price/claim-price';
import { ValidationService } from './validation.service';

import { AppSettingsProvider } from '../providers/app-settings/app-settings';
import { ServerProvider } from '../providers/server/server'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {SocketIoModule, SocketIoConfig } from 'ng-socket-io';
let configIo:SocketIoConfig = {
  url: 'http://175.55.0.23/3000/',
  options:{}
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    RegisterPage,
    ValidateUserPage,
    ClaimPricePage,
    GamePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    SocketIoModule.forRoot(configIo)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    RegisterPage,
    ValidateUserPage,
    ClaimPricePage,
    GamePage
  ],  
  providers: [
    StatusBar,
    SplashScreen,
    AppSettingsProvider,
    ServerProvider,
    ValidationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
