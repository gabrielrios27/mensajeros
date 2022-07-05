/* eslint-disable simple-import-sort/imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { AdminModule } from './admin.module';

/* Containers */
import * as adminContainers from './containers';

// Components
import * as adminComponents from './components';

/* Guards */
import * as adminGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    component: adminComponents.HomeComponent,
  },
];

@NgModule({
  imports: [AdminModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
