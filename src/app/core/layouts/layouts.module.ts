/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
// import { AppCommonModule } from '@common/app-common.module';
// import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as layoutsComponents from './components';

/* Containers */
import * as layoutsContainers from './containers';

/* Guards */
import * as layoutsGuards from './guards';

/* Services */
import * as layoutsServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        // AppCommonModule,
        // NavigationModule,
    ],
    providers: [...layoutsServices.services, ...layoutsGuards.guards],
    declarations: [...layoutsContainers.containers, ...layoutsComponents.components],
    exports: [...layoutsContainers.containers, ...layoutsComponents.components],
})
export class LayoutsModule {}
