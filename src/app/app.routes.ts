import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardGuard } from './services/dashboard.guard';


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
        path:'register',
        component:RegisterComponent
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