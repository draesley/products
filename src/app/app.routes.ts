import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardGuard } from './services/dashboard.guard';
import { CompaniesComponent } from './companies.product/companies.component';
import { CompanyServiceComponent } from './companies.service/company-service.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    {
        path:'',
        component:DashboardComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'companies/:id',
        component:CompaniesComponent
    },
    {
        path:'company-service/:id',
        component:CompanyServiceComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'',
        component:PagesComponent,
        canActivate:[DashboardGuard],
        loadChildren:'./pages/pages.module#PagesModule'
    },
    {
        path:'',
        redirectTo:'/dashboard',
        pathMatch: 'full'
    }, 
    {
        path:'**',
        component: NopagefoundComponent
    }
]
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true});