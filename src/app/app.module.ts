import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { httpInterceptorProviders } from './interceptors/http-interceptor-providers';
import { AppSharedModule } from './shared/app-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    AppSharedModule,
    ApiModule.forRoot({ rootUrl: environment.J2C_BASE_URL }),
    NgxsModule.forRoot([], { developmentMode: !environment.production })
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
