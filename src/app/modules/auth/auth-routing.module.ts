/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';
import { RecoverPasswordComponent } from './containers/recover-password/recover-password.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { AuthGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: authContainers.LoginComponent,
  },
  {
    path: 'register',
    canActivate: [],
    component: authContainers.RegisterComponent,
  },
  {
    path: 'forgot-password',
    canActivate: [],
    component: ForgotPasswordComponent,
  },
  {
    path: 'recover-password/:token',
    canActivate: [],
    component: RecoverPasswordComponent,
  },
];

@NgModule({
  imports: [AuthModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
