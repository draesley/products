import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryService } from '../../pages/services/category.service';
import { Subscription } from 'rxjs';
import { Category } from '../../config/model/category';
import { Line } from '../../config/model/line';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
})
export class LineComponent implements OnInit {

  subscription:Subscription;
  @Output()
  emmiter = new EventEmitter<boolean>();
  model:Line;
  modelupdate:Line;
  show:boolean = false;
  lines:Line[] = [];
  categories:Category[] = [];

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.init();
    this.listLines();
    this.listCategory();
  }

  init(){
    this.model ={
      _id:null,
      name:"",
      category:null
    }
  }

  init2(){
    this.modelupdate = {
      _id:null,
      name:"",
      category:null
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
      this.categories = res.categories;
    });
  }
  

  listLines(){
    this.categoryService.listLines().subscribe((res:any)=>{
      this.lines = res.lines;
    });
  }

  save(line:Line){

    if(line.name == ""){
      swal('Pleasse','Enter a name for the line','warning');
      return;
    }

    let index = 0;
    this.lines.forEach(element => {
      if(line.name === element.name && line.category._id === element.category._id){
          index +=1;
      }
    });

    if(index > 0){
      swal('!!!!','The name of the line already exists','warning');
      index = 0;
      return;
    }
    
    if(line.category == null){
      swal('Pleasse','Line null, contact technical service','warning');
      return;
    }else{
      this.categoryService.saveLine(line);
      this.render();
      this.init();
    }
  }

  update(line:Line){

      if(line.category._id == null){
        swal('Pleasse','Line null, contact technical service','warning');
        return;
      }

      if( line.name == ""){
        swal('Pleasse','Enter a name for the line','warning');
        return;
      }else{
        this.categoryService.updateLine(line);
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
          this.categoryService.deleteByIdLine(id);
          this.render();
        }
    }); 
  }
}