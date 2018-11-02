import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../config/model/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subline',
  templateUrl: './subline.component.html',
  styles: []
})
export class SublineComponent implements OnInit {

  subLinesList:Category[] = [];
  @Output()
  emmiter = new EventEmitter<boolean>();
  subscription:Subscription;
  show:boolean = false;
  model:Category;
  lines:Category[] = [];
  modelupdate:Category;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.init();
    this.listSublines();
    this.listLines();
  }

  init(){
    this.model = {
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

  showCard(){
    this.show = true;
  }

  render(){
    this.subscription = this.categoryService.observable.subscribe(()=>{
      this.listSublines();
      this.emmiter.emit(true);
    });
  }

  listSublines(){
    this.categoryService.listSubLines().subscribe((res:any)=>{
      this.subLinesList = res;
    })
  }

  listLines(){
    this.categoryService.listLines().subscribe((res:any)=>{
      this.lines = res;
    });
  }

  save(category:Category){

    if(category.name == ""){
      swal('Pleasse','Enter a name for the Subline','warning');
      return;
    }

    let index = 0;
    this.subLinesList.forEach(element => {
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
      swal('Pleasse','Select a Category','warning');
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
      title:'¿you are sure to delete this SubLine?',
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
