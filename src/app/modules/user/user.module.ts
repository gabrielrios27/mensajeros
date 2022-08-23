/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Components */
import * as userComponents from './components';

/* Containers */
import * as userContainers from './containers';

/* Guards */
import * as userGuards from './guards';

/* Services */
import * as userServices from './services';
import { PendingReportsComponent } from './containers/pending-reports/pending-reports.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [...userServices.services, ...userGuards.guards],
  declarations: [
    ...userContainers.containers,
    ...userComponents.components,
    PendingReportsComponent,
  ],
  exports: [...userContainers.containers, ...userComponents.components],
})
export class UserModule {}
