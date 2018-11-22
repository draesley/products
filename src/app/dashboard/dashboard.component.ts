import { Component, OnInit } from '@angular/core';
import { Product } from '../config/model/product';
import { ProductService } from '../pages/services/product.service';
import { Menu } from '../config/model/menu';
import { MenuService } from '../services/menu.service';

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

  constructor(private productService:ProductService,
              public menuService:MenuService) { }

  ngOnInit() {
    initPlugin();
    this.listProducts();
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
        this.products = res;
      });
  }

  searchProduct(index:string){
   
    if(index.length <= 0){
      this.listProducts();
      return;
    }
    this.productService.searchProduct(index).subscribe((res:any)=>{
      this.products = res;
    });
  }

}
