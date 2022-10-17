import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './core/layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorInterceptor } from './modules/admin/services/jwt-interceptor.interceptor';
import { ReportsComponent } from './app/modules/admin/containers/reports/reports.component';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [AppComponent, ReportsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
