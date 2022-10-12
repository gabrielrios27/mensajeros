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
import { ConfirmOutGuard } from './guards/confirm-out.guard';
import { PreviewReportComponent } from './containers/preview-report/preview-report.component';
import { ReceivedReportComponent } from './containers/received-report/received-report.component';
import { CreateComparativeReportsComponent } from './containers/create-comparative-reports/create-comparative-reports.component';
import { ComparativeTableComponent } from './containers/comparative-table/comparative-table.component';
import { ListComparativeReportsComponent } from './containers/list-comparative-reports/list-comparative-reports.component';
import { ActivityLogComponent } from './containers/activity-log/activity-log.component';
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
    path: 'usuarios/historial-de-actividades/:id-usuario',
    canActivate: [AdminGuard],
    component: ActivityLogComponent,
    pathMatch: 'full',
  },
  {
    path: 'centros',
    canActivate: [AdminGuard],
    component: adminContainers.CentersComponent,
    pathMatch: 'full',
  },
  {
    path: 'centros/crear-informe-comparativo/:id-centro',
    canActivate: [AdminGuard],
    component: CreateComparativeReportsComponent,
    pathMatch: 'full',
  },
  {
    path: 'centros/crear-informe-comparativo/:id-centro/tabla-comparativa',
    canActivate: [AdminGuard],
    component: ComparativeTableComponent,
    pathMatch: 'full',
  },
  {
    path: 'centros/crear-informe-comparativo/:id-centro/tabla-comparativa/:id-informe',
    canActivate: [AdminGuard],
    component: ComparativeTableComponent,
    pathMatch: 'full',
  },
  {
    path: 'centros/ver-informes-comparativo/:id-centro',
    canActivate: [AdminGuard],
    component: ListComparativeReportsComponent,
    pathMatch: 'full',
  },

  {
    path: 'centros/crear-informe-comparativo/:id-centro/tabla-comparativa/:id-informe',
    canActivate: [AdminGuard],
    component: ComparativeTableComponent,
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
    canDeactivate: [ConfirmOutGuard],
    component: adminContainers.AddVariablesComponent,
    pathMatch: 'full',
  },
  {
    path: 'variables/variables-agrupadas/:id-axe',
    canActivate: [AdminGuard],
    component: adminContainers.VariablesGroupComponent,
    pathMatch: 'full',
  },
  {
    path: 'variables/variables-agrupadas/:id-axe/add-mod-variables',
    canActivate: [AdminGuard],
    canDeactivate: [ConfirmOutGuard],
    component: adminContainers.AddVariablesComponent,
    pathMatch: 'full',
  },
  {
    path: 'variables/variables-agrupadas/:id-axe/add-mod-variables/:id',
    canActivate: [AdminGuard],
    canDeactivate: [ConfirmOutGuard],
    component: adminContainers.AddVariablesComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes',
    canActivate: [AdminGuard],
    redirectTo: 'reportes/creación-de-reportes',
    pathMatch: 'full',
  },
  {
    path: 'reportes/creación-de-reportes',
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
    path: 'reportes/centro-de-reportes/reporte-recibido/:id-report/:id-center',
    canActivate: [AdminGuard],
    component: ReceivedReportComponent,
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
    path: 'reportes/creación-de-reportes/add-mod-report',
    component: AddModReportComponent,
    canDeactivate: [ConfirmOutGuard],
    pathMatch: 'full',
  },
  {
    path: 'reportes/creación-de-reportes/add-mod-report/:report-id',
    component: AddModReportComponent,
    canDeactivate: [ConfirmOutGuard],
    pathMatch: 'full',
  },
  {
    path: 'reportes/creación-de-reportes/add-mod-report/preview-report',
    component: PreviewReportComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'reportes/creación-de-reportes/add-mod-report/preview-report/:report',
    component: PreviewReportComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'reportes/creación-de-reportes/add-mod-report/:report-id/preview-report/:report',
    component: PreviewReportComponent,
    canActivate: [AdminGuard],
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
