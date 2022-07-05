/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { UserModule } from './user.module';

/* Containers */
import * as userContainers from './containers';

/* Guards */
import * as userGuards from './guards';
import { DashboardOngComponent } from './admin/containers';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    component: DashboardOngComponent,
  },
];

@NgModule({
  imports: [UserModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
