import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../config/model/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:Category[] = [];
  @Output()
  emmiter = new EventEmitter<boolean>();
  Subscription:Subscription;
  model:Category;
  show:boolean = false;
  modelUp:Category;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.listCategory();
    this.init();
  }

  render(){
      this.Subscription = this.categoryService.observable.subscribe(()=>{
        this.listCategory();
        this.emmiter.emit(true);
      });
  }

  init(){
    this.model = {
      id:null,
      name:"",
      categoryId:null
    }
  }

  init2(){
    this.modelUp = {
      id:null,
      name:"",
      categoryId:null
    }
  }

  showCard(){
    this.show = true;
  }


  listCategory(){
    this.categoryService.listCategory().subscribe((res:any)=>{
      this.categories = res;
    })
  }

  save(category:Category){
   
    if(category.name == ""){
        swal('Pleasse','Enter a name for the category','warning');
        return;
    }

    let index = 0;
    this.categories.forEach(element => {
      if(category.name === element.name){
          index += 1;}
    });
    
    if(index > 0){
        swal('!!!!','The name of the category already exists','warning');
        return;
    }else{
      this.categoryService.saveCategory(category);
      this.init();
      this.render();
    }
  }

  update(category:Category){
    if(category.name == ""){
      swal('Pleasse','Enter a name for the category','warning');
      return;
    }else{

      this.categoryService.updateCategory(category);
      this.init2();
      this.render();
      this.show = false;
    }
  }

  deleteById(id:number){
    if(id == null){
      swal('Pleasse','id null, contact technical service','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this category?',
      text:'ok',
      icon:'warning',
      dangerMode:true,
    })
    .then(deletes =>{
        if(deletes){
          this.categoryService.deleteByIdCategory(id);
            this.render();
        }
    });
  }
}
