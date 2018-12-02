import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { APP_ROUTES } from './app.routes';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from './services/menu.service';
import { FlipModule } from 'ngx-flip';
import { DashboardGuard } from './services/dashboard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    FlipModule
  ],
  providers: [
    DashboardGuard,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
