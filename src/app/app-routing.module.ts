import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-routing.module').then((m) => m.AuthRoutingModule)
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, {
          scrollPositionRestoration: 'enabled',
          relativeLinkResolution: 'legacy',
      }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
