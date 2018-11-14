import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../pages/services/product.service';
import { Product } from '../../config/model/product';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../pages/services/category.service';
import { Category } from '../../config/model/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  productList:Product[] = [];
  @Output()
  emmiter = new EventEmitter<boolean>();
  subscription:Subscription;
  model:Product;
  modelUp:Product;
  subCategoryList:Category[] = [];
  show:boolean = false;
  showup:boolean = false;

  constructor(private productService:ProductService,
              private categoryService:CategoryService) { }

  ngOnInit() {
    this.listProducts();
    this.listSubCategory();
    this.init();
  }

  render(){
    this.subscription = this.productService.observable.subscribe(()=>{
        this.listProducts();
        this.emmiter.emit(true);
    });
  }

  init(){
    this.model = {
      id:null,
      code:"",
      name:"",
      img:"",
      detail:"",
      categoryId:null,
    }
  }

  init2(){
    this.model ={
      id:null,
      code:"",
      name:"",
      img:"",
      detail:"",
      categoryId:null,
    }
  }

  listProducts(){
    this.productService.listProduct().subscribe((res:any)=>{
      this.productList = res;
    });
  }

  listSubCategory(){
    this.categoryService.listSubLines().subscribe((res:any)=>{
        this.subCategoryList = res;
    });
  }

  save(product:Product){
    if(product.name == "" || product.detail == "" || product.categoryId == null){
        swal('Product','The Name, Detail and Category fields are required','warning');
        return;
    }

    this.productService.save(product);
    this.render();
    this.init();
    this.show = false;
  }

  update(product:Product){
      if(product.name == "" || product.detail == ""){
        swal('The Name and Detail field are required','','warning');
        return;
      }

      this.productService.update(product);
      this.render();
      this.showup = false;
      this.init2();
  }

  deleteByid(id:number){
    if(id == null){
      swal('Pleasse','Product does not exist, contact technical service','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Product?',
      text:'ok',
      icon:'warning',
      dangerMode:true,
    })
    .then(deletes =>{
        if(deletes){
          this.productService.deleteById(id);
          this.render();
        }
    });
  }

}
