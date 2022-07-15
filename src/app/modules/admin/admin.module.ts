/* eslint-disable simple-import-sort/imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
// import { AppCommonModule } from '@common/app-common.module';
// import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as adminComponents from './components';

/* Containers */
import * as adminContainers from './containers';

/* Guards */
import * as adminGuards from './guards';

/* Services */
import * as adminServices from './services';
import { LayoutsModule } from '../../core/layouts/layouts.module';

/* Angular Material Components*/
import { MatTableModule } from '@angular/material/table';
import { AddAxesComponent } from './containers/add-axes/add-axes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    MatTableModule,
    // AppCommonModule,
    // NavigationModule,
  ],
  providers: [...adminServices.services, ...adminGuards.guards],
  declarations: [...adminContainers.containers, ...adminComponents.components, AddAxesComponent],
  exports: [...adminContainers.containers, ...adminComponents.components],
})
export class AdminModule {}
