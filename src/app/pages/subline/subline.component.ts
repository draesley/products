import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../pages/services/category.service';
import { Category } from '../../config/model/category';
import { Subscription } from 'rxjs';
import { Subline } from '../../config/model/subline';
import { Line } from '../../config/model/line';

@Component({
  selector: 'app-subline',
  templateUrl: './subline.component.html',
  styles: []
})
export class SublineComponent implements OnInit {

  subLines:Subline[] = [];
  @Output()
  emmiter = new EventEmitter<boolean>();
  subscription:Subscription;
  show:boolean = false;
  model:Subline;
  lines:Subline[] = [];
  modelupdate:Subline;
  categoryName:string = "";
  categoryNameu:string = "";

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.init();
    this.listSublines();
    this.listLines();
  }

  init(){
    this.model = {
      _id:null,
      name:"",
      line:null
    }
  }

  init2(){
    this.modelupdate = {
      _id:null,
      name:"",
      line:null
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
      this.subLines = res.sublines;
    })
  }

  listLines(){
    this.categoryService.listLines().subscribe((res:any)=>{
      this.lines = res.lines;
    });
  }

  searchLine(index:any){
     this.categoryName = index.category.name;
    console.log(index);

  }

  save(subline:Subline){

    if(subline.name == ""){
      swal('Pleasse','Enter a name for the Subline','warning');
      return;
    }

    let index = 0;
    this.subLines.forEach(element => {
      if(subline.name === element.name && subline.line._id === element.line._id){
          index +=1;
      }
    });

    if(index > 0){
      swal('!!!!','The name of the line already exists','warning');
      index = 0;
      return;
    }
    
    if(subline.line == null){
      swal('Pleasse','Select a Category','warning');
      return;
    }else{
      console.log(subline);
      this.categoryService.saveSubLine(subline);
      this.render();
      this.init();
      this.categoryName = "";
    }
  }

  update(subline:Subline){

    if(subline.line._id == null){
      swal('Pleasse','Category null, contact technical service','warning');
      return;
    }

    if( subline.name == ""){
      swal('Pleasse','Enter a name for the line','warning');
      return;
    }else{
      this.categoryService.updateSubLine(subline);
      this.render();
      this.init2();
      this.categoryNameu = "";
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
          this.categoryService.deleteByIdSubline(id);
          this.render();
        }
    });
  }

}
