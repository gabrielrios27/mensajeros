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
import { PopUpNoExistComponent } from './components/pop-up-no-exist/pop-up-no-exist.component';
import { PopUpDeleteReportComponent } from './components/pop-up-delete-report/pop-up-delete-report.component';
import { PopUpStartComponent } from './components/pop-up-start/pop-up-start.component';
import { UploadReportsComponent } from './containers/upload-reports/upload-reports.component';
import { ReportUploadComponent } from './components/report-upload/report-upload.component';

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
    PopUpNoExistComponent,
    PopUpDeleteReportComponent,
    PopUpStartComponent,
    UploadReportsComponent,
    ReportUploadComponent,
  ],
  exports: [...userContainers.containers, ...userComponents.components],
})
export class UserModule {}
