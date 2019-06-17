import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NgxsModule, Store } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { ApiModule, Configuration } from './api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { HistoryService } from './services/history/history.service';
import { UserState } from './states/user/user.state';
import { of, EMPTY } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { LoginUser } from './states/user/user.actions';

export function withConfigurationFactory(): Configuration {
    return new Configuration({
        basePath: environment.apiBasePath
    });
}

export function onAutologin(store: Store) {
    return () =>
        of(store.selectSnapshot(UserState.token))
            .pipe(switchMap(token => (token ? store.dispatch(new LoginUser({ token })) : EMPTY)))
            .toPromise();
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
        NgxsModule.forRoot([UserState], { developmentMode: !environment.production }),
        NgxsStoragePluginModule.forRoot({ key: 'user.token' }),
        ApiModule.forRoot(withConfigurationFactory)
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        HistoryService,
        { provide: APP_INITIALIZER, multi: true, useFactory: onAutologin, deps: [Store] }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
