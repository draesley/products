import { Component, OnInit } from '@angular/core';
import { Product } from '../config/model/product';
import { ProductService } from '../pages/services/product.service';
import { Menu } from '../config/model/menu';
import { MenuService } from '../services/menu.service';
import { ServiceService } from '../pages/services/service.service';
import { Service } from '../config/model/service';
import { Category } from '../config/model/category';
import { CategoryService } from '../pages/services/category.service';
import { Subline } from '../config/model/subline';

declare function initPlugin();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products:Product[] = [];
  sublineProduct:Product[] = [];
  flipDiv:boolean = false;
  menu:Menu[] = [];
  services:Service[] = [];
  hidden:boolean = false;
  sublines:Subline[] = [];
  id:string = "";
  show:boolean = false;

  constructor(private productService:ProductService,
              public menuService:MenuService,
              public serviceService:ServiceService,
              public categoryService:CategoryService) { }

  ngOnInit() {
    initPlugin();
    this.listProducts();
    this.ListServices();
    this.listSublines();
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

  listSublines(){
    this.categoryService.listSubLines().subscribe((res:any)=>{
        this.sublines = res.sublines;
    });
  }

  searchForSubline(){
    if(this.id == null)
    {
      return;
    };

    this.productService.searchForSublines(this.id).subscribe((res:any)=>{
        this.show = true;
        this.sublineProduct = res.products;
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
        this.show = false;
      break;
      case 2:
        this.products = [];
        this.ListServices();
        this.hidden = true;
        this.show = false;
      break;
    }
  }

}
