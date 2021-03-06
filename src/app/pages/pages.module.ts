import { NgModule } from "@angular/core";
import { ProgressComponent } from "./progress/progress.component";
import { Grafic1Component } from "./grafic1/grafic1.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { AttributeComponent } from './attribute/attribute.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { LineComponent } from './line/line.component';
import { SublineComponent } from './subline/subline.component';
import { ProductComponent } from './product/product.component';
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
import { PipesModule } from "../pipes/pipes.module";
import { AngularSplitModule } from 'angular-split';
import { ProfileComponent } from './profile/profile.component';
import { ImageComponent } from "../component/image/image.component";
import { ServiceComponent } from './service/service.component';
import { ServicesModule } from './services/services.module';
import { PagesComponent } from "./pages.component";
import { ServicesCompanyService } from "./services/services-company.service";
import { ServicesCompanyComponent } from './services-company/services-company.component';
/* export function tokenGetter() {
    return localStorage.getItem('access_token');
  } */

@NgModule({
    declarations:[
        ProgressComponent,
        Grafic1Component,
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
        PagesComponent,
        ProfileComponent,
        ServiceComponent,
        ImageComponent,
        ServicesCompanyComponent
    ],
    exports:[
        ProgressComponent,
        Grafic1Component,
        AttributeComponent,
        CategoryComponent,
        ProductComponent,
        PagesComponent,
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        PipesModule,
        AngularSplitModule,
        ServicesModule,
    ],
    providers:[
       /*  ContactService,
        MenuService,
        UploadFileService,
        UserService,
        ImageService,
        ServiceService */
    ]
})
export class PagesModule{}