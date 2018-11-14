import { Component, OnInit } from '@angular/core';
import { Product } from '../config/model/product';
import { ProductService } from '../pages/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products:Product[] = [];

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.listProducts();
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
