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
import { LayoutsModule } from 'src/app/core/layouts/layouts.module';

/* Angular Material Components*/
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddModCenterComponent } from './containers/add-mod-center/add-mod-center.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { VariablesComponent } from './containers/variables/variables.component';
import { AddVariablesComponent } from './containers/add-variables/add-variables.component';
import { AddReportComponent } from './containers/add-report/add-report.component';
import { CenterOfReportComponent } from './containers/center-of-report/center-of-report.component';
import { VariablesGroupComponent } from './containers/variables-group/variables-group.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    // AppCommonModule,
    // NavigationModule,
  ],
  providers: [...adminServices.services, ...adminGuards.guards],
  declarations: [
    ...adminContainers.containers,
    ...adminComponents.components,
    AddAxesComponent,AmUserComponent,AddModCenterComponent, VariablesComponent, AddVariablesComponent, AddReportComponent, CenterOfReportComponent, VariablesGroupComponent
  ],
  exports: [...adminContainers.containers, ...adminComponents.components],
})
export class AdminModule {}
