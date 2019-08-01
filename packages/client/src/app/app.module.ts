import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NgxsModule, Store } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ApiModule, Configuration } from './core/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { UserState } from './shared/states/user/user.state';
import { of, EMPTY } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';
import { LoginUser } from './shared/states/user/user.actions';
import { QuestionState } from './shared/states/question/question.state';
import { HistoriesState } from './shared/states/histories/histories.state';

export function configurationFactory(): Configuration {
    return new Configuration({
        basePath: environment.apiBasePath
    });
}

export function onAutologin(store: Store) {
    return () =>
        of(store.selectSnapshot(UserState.token))
            .pipe(flatMap(token => (token ? store.dispatch(new LoginUser({ token })) : EMPTY)))
            .toPromise();
}

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export function onInitLanguage(translateService: TranslateService) {
    return () =>
        translateService
            .use(translateService.getBrowserLang())
            .pipe(catchError(() => translateService.use('en')))
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            },
            useDefaultLang: true
        }),
        NgxsModule.forRoot([UserState, QuestionState, HistoriesState], {
            developmentMode: !environment.production
        }),
        NgxsStoragePluginModule.forRoot({ key: 'user.token' }),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
        ApiModule.forRoot(configurationFactory)
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: APP_INITIALIZER, multi: true, useFactory: onAutologin, deps: [Store] },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: onInitLanguage,
            deps: [TranslateService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
