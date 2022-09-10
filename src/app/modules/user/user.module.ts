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
import { VariableUploadComponent } from './components/variable-upload/variable-upload.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopUpSuccessComponent } from './components/pop-up-success/pop-up-success.component';
import { PopUpErrorComponent } from './components/pop-up-error/pop-up-error.component';

// angular material
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon'
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    CdkStepperModule,
    MatProgressBarModule,
    MatIconModule
    
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
    VariableUploadComponent,
    PopUpSuccessComponent,
    PopUpErrorComponent,
    ProgressBarComponent,
  ],
  exports: [...userContainers.containers, ...userComponents.components],
})
export class UserModule {}
