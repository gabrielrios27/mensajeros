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
