import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';;
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { ApiModule, Configuration } from './api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { UserService } from './services/user/user.service';
import { HistoryService } from './services/history/history.service';
import { CommonDirectivesModule } from './directives/directives.module';

export function withConfigurationFactory(): Configuration {
  return new Configuration({
    basePath: environment.apiBasePath
  })
}

export function appInitializerFactory(userService: UserService) {
  return () => userService.autologin().toPromise();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'tfg', separator: '.' }),
    ApiModule.forRoot(withConfigurationFactory)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    HistoryService,
    { provide: APP_INITIALIZER, multi: true, useFactory: appInitializerFactory, deps: [UserService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
