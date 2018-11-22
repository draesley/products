import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { MenuService } from '../../services/menu.service';
import { UserService } from '../../pages/services/user.service';
import { Menu } from '../../config/model/menu';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menus:Menu[] = [];
  role = "";
  row:number = 0;

  constructor(public sidebarService:SidebarService,
              public userService:UserService,
              public menuService:MenuService) { 
               
              }

  ngOnInit() {
    this.menu();
    this.menus =JSON.parse(localStorage.getItem('menu'));
    this.row = JSON.parse(localStorage.getItem('row'));
    this.role = JSON.parse(localStorage.getItem('user.roleId.name'));
  }

  menu(){
    if(this.userService.userRole === "user"){
        this.menuService.listMenu(1).subscribe((res:any)=>{
        localStorage.setItem('menu',JSON.stringify(res));
        this.row = res.length;
        localStorage.setItem('row', JSON.stringify(this.row));
        return this.menus = res;
        
      });
    };
    
    if(this.userService.userRole === "administrator"){
        this.menuService.listMenu(2).subscribe((res:any)=>{
        this.menus = res;
        this.row = this.menus.length;
        localStorage.setItem('row', JSON.stringify(this.row));
        this.row = this.menus.length;
        localStorage.setItem('menu',JSON.stringify(res));
      });
      return this.menus;
   };
  }
}