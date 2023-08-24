import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { app_routing } from './app.routes';
import { SigninPageComponent } from './pages/login-pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/login-pages/signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'; // Importa MatMenuModule


import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { ReservePageComponent } from './pages/reserve-page/reserve-page.component';
import { StepreserveModalComponent } from './components/stepreserve-modal/stepreserve-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MainPageComponent,
    SigninPageComponent,
    SignupPageComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardPageComponent,
    ProfilePageComponent,
    SetupPageComponent,
    ReservePageComponent,
    StepreserveModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatMenuModule,
    HttpClientModule,
    app_routing,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
