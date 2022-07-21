/* eslint-disable simple-import-sort/imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

/* Module */
import { AdminModule } from './admin.module';

/* Containers */
import * as adminContainers from './containers';
// components
import * as adminComponents from './components';

/* Guards */
import * as adminGuards from './guards';
import { AmUserComponent } from './containers/am-user/am-user.component';
import { AddModCenterComponent } from './containers/add-mod-center/add-mod-center.component';
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
    path: 'usuarios/create-user',
    component: AmUserComponent,
    pathMatch: 'full'
  },
  {
    path: 'centros/add-mod-center',
    component: AddModCenterComponent,
    pathMatch: 'full'
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
