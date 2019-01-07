import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../pages/services/user.service';
import { Menu } from '../../config/model/menu';
import { User } from '../../config/model/user';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menus:Menu[] = [];
  user:User;

  constructor(public sidebarService:SidebarService,
              public userService:UserService,) { 
               
              }

  ngOnInit() {
    this.menus = this.sidebarService.menu;
    this.user = this.userService.user;
  }
}