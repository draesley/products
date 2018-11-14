import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TypeLocationService } from '../../pages/services/type-location.service';
import { TypeLocation } from '../../config/model/type.location';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-location',
  templateUrl: './type-location.component.html',
})
export class TypeLocationComponent implements OnInit {

  model:TypeLocation;
  modelUp:TypeLocation;
  typeLocationes:TypeLocation[] = [];
  show:boolean = false;
  subscription = new Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();

  constructor(private typeLocationService:TypeLocationService) { }

  ngOnInit() {
    this.listTypeLocation();
    this.init();
  }

  init(){
    this.model ={
      id:null,
      name:""
    }
  }

  init2(){
    this.modelUp ={
      id:null,
      name:""
    }
  }

  showCard(){
    this.show = true;
  }

  render(){
    this.subscription = this.typeLocationService.observable.subscribe(()=>{
      this.listTypeLocation();
      this.emitter.emit(true);
    });
  }

  listTypeLocation(){
      this.typeLocationService.listTypeLocation().subscribe((res:any)=>{
        this.typeLocationes = res;
      });
  }

  save(typeLocation:TypeLocation){

    if(typeLocation.name == ""){
      swal('Name is required','','warning');
      return;
    }

    this.typeLocationService.save(typeLocation);
    this.init();
    this.render();
  }

  update(typeLocation:TypeLocation){
    
    if(typeLocation.name == ""){
      swal('Name is required','','warning');
      return;
    }


    if(typeLocation.id == null){
      swal('TypeLocation id is required','contact technical service','warning');
      return;
    }

    this.typeLocationService.update(typeLocation);
    this.init2();
    this.render();
  }

  deleteById(id:number){
    if(id == null){
      swal('TypeLocation id is required','contact technical service','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this TypeLocation?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.typeLocationService.deleteById(id);
        this.render();
      }
    });
  }

}
