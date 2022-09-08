/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { UserModule } from './user.module';

/* Containers */
import * as userContainers from './containers';
import * as adminContainers from '../admin/containers';

import { PendingReportsComponent } from './containers/pending-reports/pending-reports.component';
import { UploadReportsComponent } from './containers/upload-reports/upload-reports.component';

/* Guards */
import * as userGuards from './guards';
import { HomeComponent } from '../admin/containers';
import { UserGuard } from './guards/user.guard';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [UserGuard],
    redirectTo: 'home',
  },
  {
    path: 'mis-reportes',
    canActivate: [UserGuard],
    redirectTo: 'mis-reportes/pendientes',
    pathMatch: 'full',
  },
  {
    path: 'mis-reportes/pendientes',
    canActivate: [UserGuard],
    component: PendingReportsComponent,
    pathMatch: 'full',
  },
  {
    path: 'mis-reportes/pendientes/carga-de-reporte/:idReporte/:idCentro',
    canActivate: [UserGuard],
    component: UploadReportsComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [UserGuard],
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    canActivate: [UserGuard],
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [UserModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
