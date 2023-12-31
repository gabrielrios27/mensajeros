import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

export const containers = [
  GeneralLayoutComponent,
  AuthLayoutComponent,
  AdminLayoutComponent,
  UserLayoutComponent,
];

export * from './general-layout/general-layout.component';
export * from './auth-layout/auth-layout.component';
export * from './admin-layout/admin-layout.component';
export * from './user-layout/user-layout.component';
