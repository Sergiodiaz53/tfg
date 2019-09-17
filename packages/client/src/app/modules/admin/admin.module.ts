import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './admin.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { HttpClientModule } from '@angular/common/http';
import { AdminSpecsResolver } from './resolvers/admin-specs.resolver';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ModelInfoPage } from './pages/model-info/model-info.page';
import { ModelInfoResolver } from './resolvers/model-info-specs.resolver';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [HomePage, SidebarComponent, HeaderComponent, ModelInfoPage],
    imports: [
        CommonModule,
        HttpClientModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage,
                resolve: {
                    adminSpecs: AdminSpecsResolver
                },
                children: [
                    {
                        path: 'model-info',
                        component: ModelInfoPage,
                        resolve: {
                            modelInfo: ModelInfoResolver
                        },
                        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
                    }
                ]
            }
        ]),
        TranslateModule.forChild(),
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyIonicModule
    ],
    providers: [AdminSpecsResolver, ModelInfoResolver]
})
export class AdminModule {}
