/* eslint-disable simple-import-sort/imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { AdminModule } from './admin.module';

/* Containers */
import * as adminContainers from './containers';
// components
import * as adminComponents from './components';

/* Guards */
import * as adminGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    redirectTo: 'home',
  },
  {
    path: 'home',
    canActivate: [],
    component: adminContainers.HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    canActivate: [],
    component: adminContainers.UsersComponent,
    pathMatch: 'full',
  },
  {
    path: 'centros',
    canActivate: [],
    component: adminContainers.CentersComponent,
    pathMatch: 'full',
  },
  {
    path: 'ejes',
    canActivate: [],
    component: adminContainers.AxesComponent,
    pathMatch: 'full',
  },
  {
    path: 'agregar-eje',
    canActivate: [],
    component: adminContainers.AddAxesComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes',
    canActivate: [],
    component: adminContainers.ReportsComponent,
    pathMatch: 'full',
  },
  {
    path: 'ayuda',
    canActivate: [],
    component: adminContainers.HelpComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    canActivate: [],
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [AdminModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
