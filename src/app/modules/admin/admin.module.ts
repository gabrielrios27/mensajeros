/* eslint-disable simple-import-sort/imports */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { VariablesComponent } from './containers/variables/variables.component';
import { AddVariablesComponent } from './containers/add-variables/add-variables.component';
import { AddReportComponent } from './containers/add-report/add-report.component';
import { CenterOfReportComponent } from './containers/center-of-report/center-of-report.component';
import { VariablesGroupComponent } from './containers/variables-group/variables-group.component';
import { AddModReportComponent } from './containers/add-mod-report/add-mod-report.component';
import { ConfirmOutModalComponent } from './components/confirm-out-modal/confirm-out-modal.component';
import { SelecsAxesVariablesComponent } from './containers/selecs-axes-variables/selecs-axes-variables.component';
import { PreviewReportComponent } from './containers/preview-report/preview-report.component';
import { PreviewVariableComponent } from './components/preview-variable/preview-variable.component';
import { ReceivedReportComponent } from './containers/received-report/received-report.component';
import { VariablesShowComponent } from './containers/variables-show/variables-show.component';
import { AddModCenterComponent } from './containers/add-mod-center/add-mod-center.component';
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
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EvolutionOfVariableComponent } from './containers/evolution-of-variable/evolution-of-variable.component';

import { NgApexchartsModule } from 'ng-apexcharts';

import { CreateComparativeReportsComponent } from './containers/create-comparative-reports/create-comparative-reports.component';
import { ComparativeTableComponent } from './containers/comparative-table/comparative-table.component';
import { CompareVariableComponent } from './components/compare-variable/compare-variable.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { ListComparativeReportsComponent } from './containers/list-comparative-reports/list-comparative-reports.component';
import { ActivityLogComponent } from './containers/activity-log/activity-log.component';
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
    // AppCommonModule,
    // NavigationModule,
  ],
  providers: [
    ...adminServices.services,
    ...adminGuards.guards,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  declarations: [
    ...adminContainers.containers,
    ...adminComponents.components,
    AddAxesComponent,
    AmUserComponent,
    AddModCenterComponent,
    VariablesComponent,
    AddVariablesComponent,
    AddReportComponent,
    CenterOfReportComponent,
    VariablesGroupComponent,
    AddModReportComponent,
    SelecsAxesVariablesComponent,
    AddAxesComponent,
    AmUserComponent,
    AddModCenterComponent,
    VariablesComponent,
    AddVariablesComponent,
    AddReportComponent,
    CenterOfReportComponent,
    VariablesGroupComponent,
    ConfirmOutModalComponent,
    PreviewVariableComponent,
    PreviewReportComponent,
    ReceivedReportComponent,
    CreateComparativeReportsComponent,
    ComparativeTableComponent,
    CompareVariableComponent,
    VariablesShowComponent,
    EvolutionOfVariableComponent,
    ModalAlertComponent,
    ListComparativeReportsComponent,
    ActivityLogComponent,
  ],
  exports: [
    ...adminContainers.containers,
    ...adminComponents.components,
    SelecsAxesVariablesComponent,
    ModalAlertComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
