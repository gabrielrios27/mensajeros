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
import { UsersComponent } from './containers/users/users.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from './guards';
import { AddModReportComponent } from './containers/add-mod-report/add-mod-report.component';
/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    redirectTo: 'home',
  },
  {
    path: 'home',
    canActivate: [AdminGuard],
    component: adminContainers.HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsersComponent,
    pathMatch: 'full',
  },

  {
    path: 'centros',
    canActivate: [AdminGuard],
    component: adminContainers.CentersComponent,
    pathMatch: 'full',
  },
  {
    path: 'ejes',
    canActivate: [AdminGuard],
    component: adminContainers.AxesComponent,
    pathMatch: 'full',
  },
  {
    path: 'ejes/agregar-eje',
    canActivate: [AdminGuard],
    component: adminContainers.AddAxesComponent,
    pathMatch: 'full',
  },
  {
    path: 'ejes/agregar-eje/:id',
    canActivate: [AdminGuard],
    component: adminContainers.AddAxesComponent,
  },
  {
    path: 'variables',
    canActivate: [AdminGuard],
    component: adminContainers.VariablesComponent,
    pathMatch: 'full',
  },
  {
    path: 'variables/add-mod-variables',
    canActivate: [AdminGuard],
    component: adminContainers.AddVariablesComponent,
    pathMatch: 'full',
  },
  {
    path: 'variables/variables-agrupadas/:id',
    canActivate: [AdminGuard],
    component: adminContainers.VariablesGroupComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes',
    canActivate: [AdminGuard],
    redirectTo: 'reportes/creacion-de-reportes',
    pathMatch: 'full',
  },
  {
    path: 'reportes/creacion-de-reportes',
    canActivate: [AdminGuard],
    component: adminContainers.ReportsComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes/centro-de-reportes',
    canActivate: [AdminGuard],
    component: adminContainers.CenterOfReportComponent,
    pathMatch: 'full',
  },
  {
    path: 'ayuda',
    canActivate: [AdminGuard],
    component: adminContainers.HelpComponent,
    pathMatch: 'full',
  },
  {
    path: 'usuarios/create-user',
    canActivate: [AdminGuard],
    component: AmUserComponent,
    pathMatch: 'full',
  },
  {
    path: 'centros/add-mod-center',
    component: AddModCenterComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes/creacion-de-reportes/add-mod-report',
    component: AddModReportComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    canActivate: [AdminGuard],
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [AdminModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
