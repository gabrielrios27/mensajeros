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
import { AmUserComponent } from './containers/am-user/am-user.component';
import { AddAxesComponent } from './containers/add-axes/add-axes.component';
/* Containers */
import * as adminContainers from './containers';


/* Guards */
import * as adminGuards from './guards';

/* Services */
import * as adminServices from './services';
import { LayoutsModule } from '../../core/layouts/layouts.module';

/* Angular Material */
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    // AppCommonModule,
    // NavigationModule,
  ],
  providers: [...adminServices.services, ...adminGuards.guards],
  declarations: [
    ...adminContainers.containers,
    ...adminComponents.components,
    AddAxesComponent,AmUserComponent
  ],
  exports: [...adminContainers.containers, ...adminComponents.components],
})
export class AdminModule {}
