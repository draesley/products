import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTES } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { ServicesModule } from '../pages/services/services.module';
import { PagesModule } from '../pages/pages.module';
import { CompanyServiceComponent } from './company-service.component';

@NgModule({
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ServicesModule,
    PagesModule 
  ],
  declarations: [
    CompanyServiceComponent
  ]
})
export class CompanyServiceModule { }
