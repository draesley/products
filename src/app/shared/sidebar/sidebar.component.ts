import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menus:any;
  role = "administrador";

  constructor(private router:Router,
              private menuService:MenuService) { }

  ngOnInit() {
   this.menus = Menu;
    //this.menus = this.menuService.menu(this.role);
  }
}
