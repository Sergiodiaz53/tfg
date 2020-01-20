import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InfoComponent } from './info/info.component';

const components = [ButtonComponent, InputComponent, InfoComponent];

@NgModule({
    declarations: components,
    exports: components,
    imports: [CommonModule, IonicModule]
})
export class SharedComponentsModule {}
