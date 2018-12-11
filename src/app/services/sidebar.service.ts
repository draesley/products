import { Injectable } from '@angular/core';
import { UserService } from '../pages/services/user.service';
//import { Menu } from '../shared/sidebar/menu';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [];
  constructor(public userService:UserService) {
    this.menu = this.userService.menu;
   }

}