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
                path:'',
                redirectTo:'/dashboard',
                pathMatch: 'full'
            },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
