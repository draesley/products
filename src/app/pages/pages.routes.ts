import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafic1Component } from "./grafic1/grafic1.component";
import { Component } from '@angular/core';
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

const pagesRoutes: Routes = [
    {
        path:'',
        component:PagesComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
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
                path:'attribute-prodcut-company',
                component:AttributeProdcutCompanyComponent
            },
            {
                path:'',
                redirectTo:'/dashboard',
                pathMatch: 'full'
            },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);