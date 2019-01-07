import { Component, OnInit } from '@angular/core';
import { Product } from '../config/model/product';
import { ProductService } from '../pages/services/product.service';
import { Menu } from '../config/model/menu';
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
  index:number = 0;
  totalFiles:number= 0;

  constructor(private productService:ProductService,
              public serviceService:ServiceService,
              public categoryService:CategoryService) { }

  ngOnInit() {
    initPlugin();
    this.ListServices();
    this.listSublines();
    this.productsPaginado();
  }

  changeFlip(){
    if(this.flipDiv == false){
      this.flipDiv = true;
    }else{
      this.flipDiv = false;
    }
  }

  changepage(index:number){

      let control = this.index + index;

      if(control >= this.totalFiles){
        return;
      }

      if(control < 0){
        return;
      }

      this.index += index;
    
      this.productsPaginado();
  }

  productsPaginado(){
    this.productService.productPaginado(this.index).subscribe((res:any)=>{
      this.products = res.products;
      this.totalFiles = res.total;     
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
          this.productsPaginado();
          return;
        }
        this.productService.searchProduct(index).subscribe((res:any)=>{
          this.products = res.products;
        });
      break;
      case true:
        if(index.length <= 0){
          this.ListServices();
          return;
        }
        this.serviceService.searchService(index).subscribe((res:any)=>{
          this.services = res.services;
        });
      break;
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
        this.productsPaginado();
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