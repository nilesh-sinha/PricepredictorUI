import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HttpCallingService } from './http-calling.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpModule} from '@angular/http';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

const appRoutes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'dashboard',      component: DashboardComponent },
  { path: '**', component: ErrorComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDJr9p8UQMnyZm4O3vEGkmVDhv0Wfqezds',
    }),
    AgmDirectionModule,      // agm-direction
  FormsModule,
  HttpModule
  ],
  providers: [HttpCallingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
