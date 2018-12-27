import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from './service.service';
import { ContactService } from './contact.service';
import { MenuService } from 'src/app/services/menu.service';
import { UploadFileService } from './upload-file.service';
import { UserService } from './user.service';
import { ImageService } from 'src/app/component/image/image.service';
import { ServicesCompanyService } from './services-company.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    ContactService,
    MenuService,
    UploadFileService,
    UserService,
    ImageService,
    ServiceService,
    ServicesCompanyService
  ]
})
export class ServicesModule { }
