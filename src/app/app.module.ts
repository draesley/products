import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from './services/menu.service';
import { FlipModule } from 'ngx-flip';
import { DashboardGuard } from './services/dashboard.guard';
import { ImageService } from './component/image/image.service';
import { PipesModule } from './pipes/pipes.module';

import { PagesModule } from './pages/pages.module';
import { CompaniesModule } from './companies.product/companies.module';
import { CompanyServiceModule } from './companies.service/company-service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    FlipModule,
    PipesModule,
    CompaniesModule,
    CompanyServiceModule,
    PagesModule
  ],
  providers: [
    DashboardGuard,
    MenuService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
