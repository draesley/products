import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Attribute } from '../../config/model/attribute';
import { AttributeService } from '../../pages/services/attribute.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls:['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  nameUpdate:string;
  name:string;
  attributeList:Attribute[] = [];
  attribute:Attribute;
  @Output()
  emmiter = new EventEmitter<boolean>();
  subscription:Subscription;
  showcar:boolean = false;

  constructor(private attributeService:AttributeService) { }

  ngOnInit() {
    this.listAttribute();
    this.init();
  }

  render(){
    this.subscription = this.attributeService.observable.subscribe(()=>{
      this.listAttribute();
      this.emmiter.emit(true);
    });
  }

  listAttribute(){
    this.attributeService.getlist().subscribe((res:any)=>{
      this.attributeList = res;
    });
  }

  init(){
    this.attribute ={
      id:null,
      name:""
    }
  }
  
  save(){
     if(this.name == "" || this.name == null){
      swal('Errorr!!!!','Enter a Name','warning');
      return;
     }

     let index = 0;
      this.attributeList.forEach(element => {
        if(element.name === this.name){
          index +=1;
        }
      });

      if(index > 0){
          swal('Errorrr it already exists!!!',this.name,'warning');
          return;
      }else{
        this.attribute.name = this.name;
        this.attributeService.save(this.attribute);
        this.render();
        this.name = "";
        index = 0;
      }
  }

  showCard(attribute:Attribute){
    this.showcar = true;
    this.attribute = attribute;
    this.nameUpdate = this.attribute.name;
  }

  update(){
    this.attribute.name = this.nameUpdate;
    if(this.attribute.name == "" || this.attribute.name == null){
        swal('Warning','Name Null','warning');
        return;
    }
    this.attributeService.update(this.attribute);
    this.showcar = false;
    this.render();
  }
  
  delete(id:number){

    if(id == null){
      swal('Warning','id Null','warning');
      return;
    }
    swal({
      title:'¿you are sure to delete this user?',
      text:'this attribute',
      icon:'warning',
      dangerMode:true,
    })
    .then(deletes =>{
        if(deletes){
          this.attributeService.delete(id).subscribe((res:any)=>{
            swal('Delete ok','Attribute','success');
            this.listAttribute();
            this.render();
          });
        }
    });
  }

}
