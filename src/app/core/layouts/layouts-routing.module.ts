/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { LayoutsModule } from './layouts.module';

/* Containers */
import * as layoutsContainers from './containers';

/* Guards */
import * as layoutsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: layoutsContainers.LayoutsComponent,
    // },
];

@NgModule({
    imports: [LayoutsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class LayoutsRoutingModule {}
