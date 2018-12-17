import { Component, OnInit } from '@angular/core';
import { Product } from '../config/model/product';
import { ProductService } from '../pages/services/product.service';
import { Menu } from '../config/model/menu';
import { MenuService } from '../services/menu.service';
import { ServiceService } from '../pages/services/service.service';
import { Service } from '../config/model/service';

declare function initPlugin();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products:Product[] = [];
  flipDiv:boolean = false;
  menu:Menu[] = [];
  services:Service[] = [];
  hidden:boolean = false;

  constructor(private productService:ProductService,
              public menuService:MenuService,
              public serviceService:ServiceService) { }

  ngOnInit() {
    initPlugin();
    this.listProducts();
    this.ListServices();
  }

  changeFlip(){
    if(this.flipDiv == false){
      this.flipDiv = true;
    }else{
      this.flipDiv = false;
    }
  }

  listProducts(){
      this.productService.listProduct().subscribe((res:any)=>{
        this.products = res.products;
      });
  }

  searchProduct(index:string){


    switch(this.hidden){
      case false:
        if(index.length <= 0){
          this.listProducts();
          return;
        }
        this.productService.searchProduct(index).subscribe((res:any)=>{
          this.products = res.products;
        });
      break;
      case true:{
        if(index.length <= 0){
          this.ListServices();
          return;
        }
        this.serviceService.searchService(index).subscribe((res:any)=>{
          this.services = res.services;
        });
      }
    }
   
   
  }

  ListServices(){
    this.serviceService.findServices().subscribe((res:any)=>{
      this.services = res.services;
    });
  }

  changeList(index:number){
    switch(index){
      case 1:
        this.services = [];
        this.listProducts();
        this.hidden = false;
      break;
      case 2:
        this.products = [];
        this.hidden = true;
        this.ListServices();
      break;
    }
  }

}
