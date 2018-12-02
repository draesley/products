import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumdsComponent } from "./breadcrumds/breadcrumds.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { SidebarService } from "../services/sidebar.service";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumdsComponent,
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumdsComponent,
    ],
    imports:[
        RouterModule,
        CommonModule,
        PipesModule
    ],
    providers:[
        SidebarService
    ]
})
export class SharedModule{}