/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { UserModule } from './user.module';

/* Containers */
import * as userContainers from './containers';
import * as adminContainers from '../admin/containers';

/* Guards */
import * as userGuards from './guards';
import { HomeComponent } from '../admin/containers';
import { PendingReportsComponent } from './containers/pending-reports/pending-reports.component';
import { UploadReportsComponent } from './containers/upload-reports/upload-reports.component';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    redirectTo: 'home',
  },
  {
    path: 'mis-reportes',
    canActivate: [],
    redirectTo: 'mis-reportes/pendientes',
    pathMatch: 'full',
  },
  {
    path: 'mis-reportes/pendientes',
    canActivate: [],
    component: PendingReportsComponent,
    pathMatch: 'full',
  },
  {
    path: 'mis-reportes/pendientes/carga-de-reporte/:idReporte/:idCentro',
    canActivate: [],
    component: UploadReportsComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [],
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    canActivate: [],
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [UserModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
