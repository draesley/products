import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PagesModule } from '../pages/pages.module';
import { APP_ROUTES } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FlipModule } from 'ngx-flip';
import { PipesModule } from '../pipes/pipes.module';
import { CompaniesService } from './companies.service';
import { CompaniesComponent } from './companies.component';
import { ServicesModule } from '../pages/services/services.module';

@NgModule({
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ServicesModule
  ],
  declarations: [
    CompaniesComponent
  ],
  providers:[
    CompaniesService
  ]
})
export class CompaniesModule { }