/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
// import { AppCommonModule } from '@common/app-common.module';
// import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as authComponents from './components';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Services */
import * as authServices from './services';
import { LayoutsModule } from '../../core/layouts/layouts.module';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecoverPasswordComponent } from './containers/recover-password/recover-password.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import {MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    // AppCommonModule,
    // NavigationModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  providers: [...authServices.services, ...authGuards.guards,{
    provide: MAT_RADIO_DEFAULT_OPTIONS ,
    useValue: { color: '#5600E8' },
  }],
  declarations: [
    ...authContainers.containers,
    ...authComponents.components,
    RecoverPasswordComponent,
    ForgotPasswordComponent,
  ],
  exports: [...authContainers.containers, ...authComponents.components],
})
export class AuthModule {}
