import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryService } from '../../pages/services/category.service';
import { Subscription } from 'rxjs';
import { Category } from '../../config/model/category';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
})
export class LineComponent implements OnInit {

  subscription:Subscription;
  @Output()
  emmiter = new EventEmitter<boolean>();
  model:Category;
  modelupdate:Category;
  show:boolean = false;
  lines:Category[] = [];
  categories:Category[] = [];

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.init();
    this.listLines();
    this.listCategory();
  }

  init(){
    this.model ={
      id:null,
      name:"",
      categoryId:null
    }
  }

  init2(){
    this.modelupdate = {
      id:null,
      name:"",
      categoryId:null
    }
  }

  render(){
    this.subscription = this.categoryService.observable.subscribe(()=>{
      this.listLines();
      this.emmiter.emit(true);
    });
  }

  showCard(){
    this.show = true;
  }
  
  listCategory(){
    this.categoryService.listCategory().subscribe((res:any)=>{
      this.categories = res;
    });
  }
  

  listLines(){
    this.categoryService.listLines().subscribe((res:any)=>{
      this.lines = res;
    });
  }

  save(category:Category){

    if(category.name == ""){
      swal('Pleasse','Enter a name for the line','warning');
      return;
    }

    let index = 0;
    this.lines.forEach(element => {
      if(category.name === element.name){
          index +=1;
      }
    });

    if(index > 0){
      swal('!!!!','The name of the line already exists','warning');
      index = 0;
      return;
    }
    
    if(category.categoryId == null){
      swal('Pleasse','Category null, contact technical service','warning');
      return;
    }else{
      this.categoryService.saveLine(category);
      this.render();
      this.init();
    }
  }

  update(category:Category){

      if(category.categoryId.id == null){
        swal('Pleasse','Category null, contact technical service','warning');
        return;
      }

      if( category.name == ""){
        swal('Pleasse','Enter a name for the line','warning');
        return;
      }else{
        this.categoryService.updateLine(category);
        this.render();
        this.init2();
        this.show = false;
      }
  }

  deleteById(id:number){
    if(id == null){
      swal('Pleasse','id null, contact technical service','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Line?',
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
