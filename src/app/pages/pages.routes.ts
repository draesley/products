import { RouterModule, Routes } from "@angular/router";
import { AttributeComponent } from './attribute/attribute.component';
import { CategoryComponent } from './category/category.component';
import { LineComponent } from './line/line.component';
import { SublineComponent } from "./subline/subline.component";
import { ProductComponent } from "./product/product.component";
import { DepartmentComponent } from './department/department.component';
import { CityComponent } from "./city/city.component";
import { CommuneComponent } from "./commune/commune.component";
import { TypeLocationComponent } from "./type-location/type-location.component";
import { RoleComponent } from "./role/role.component";
import { UserComponent } from "./user/user.component";
import { LocationComponent } from "./location/location.component";
import { ContactComponent } from "./contact/contact.component";
import { CompanyComponent } from "./company/company.component";
import { AttributeproductComponent } from './attributeproduct/attributeproduct.component';
import { AttributeProdcutCompanyComponent } from "./attribute-prodcut-company/attribute-prodcut-company.component";
import { PagesComponent } from './pages.component';
import { DashboardGuard } from '../services/dashboard.guard';
import { ProfileComponent } from "./profile/profile.component";
import { SearchComponent } from "./search/search.component";
import { ServiceComponent } from './service/service.component';

const pagesRoutes: Routes = [
            {
                path:'pages',
                component:PagesComponent,
                canActivate:[
                    DashboardGuard
                ],
                children:[
                    {
                        path:'category',
                        component:CategoryComponent
                    },
                    {
                        path:'attribute',
                        component:AttributeComponent
                    },
                    {
                        path:'line',
                        component:LineComponent
                    },
                    {
                        path:'subline',
                        component:SublineComponent
                    },
                    {
                        path:'product',
                        component:ProductComponent
                    },
                    {
                        path:'department',
                        component:DepartmentComponent
                    },
                    {
                        path:'city',
                        component:CityComponent
                    },
                    {
                        path:'commune',
                        component:CommuneComponent
                    },
                    {
                        path:'type-location',
                        component:TypeLocationComponent
                    },
                    {
                        path:'role',
                        component:RoleComponent
                    },
                    {
                        path:'user',
                        component:UserComponent
                    },
                    {
                        path:'location',
                        component:LocationComponent
                    },
                    {
                        path:'contact',
                        component:ContactComponent
                    },
                    {
                        path:'company',
                        component:CompanyComponent
                    },
                    {
                        path:'attributeproduct',
                        component:AttributeproductComponent
                    },
                    {
                        path:'profile',
                        component:ProfileComponent
                    },
                    {
                        path:'attribute-product-company',
                        component:AttributeProdcutCompanyComponent
                    },
                    {
                        path:'search/:index',
                        component:SearchComponent
                    },
                    {
                        path:'service',
                        component:ServiceComponent
                    }
                ]
            }
     
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);