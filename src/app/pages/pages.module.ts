import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafic1Component } from "./grafic1/grafic1.component";
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { AttributeComponent } from './attribute/attribute.component';
import { AttributeService } from "../services/attribute.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { LineComponent } from './line/line.component';
import { SublineComponent } from './subline/subline.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from "../services/product.service";
import { DepartmentComponent } from './department/department.component';
import { CityComponent } from './city/city.component';
import { CommuneComponent } from './commune/commune.component';
import { TypeLocationComponent } from './type-location/type-location.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { LocationComponent } from './location/location.component';
import { ContactComponent } from './contact/contact.component';
import { CompanyComponent } from './company/company.component';
import { AttributeproductComponent } from './attributeproduct/attributeproduct.component';
import { AttributeProdcutCompanyComponent } from './attribute-prodcut-company/attribute-prodcut-company.component';

@NgModule({
    declarations:[
        DashboardComponent,
        ProgressComponent,
        Grafic1Component,
        PagesComponent,
        AttributeComponent,
        CategoryComponent,
        LineComponent,
        SublineComponent,
        ProductComponent,
        DepartmentComponent,
        CityComponent,
        CommuneComponent,
        TypeLocationComponent,
        RoleComponent,
        UserComponent,
        LocationComponent,
        ContactComponent,
        CompanyComponent,
        AttributeproductComponent,
        AttributeProdcutCompanyComponent,
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Grafic1Component,
        PagesComponent,
        AttributeComponent,
        CategoryComponent,
        ProductComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        CommonModule,
        FormsModule    
    ],
    providers:[
        AttributeService,
        ProductService
    ]
})
export class PagesModule{}