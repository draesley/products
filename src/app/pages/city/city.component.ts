import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { City } from '../../config/model/city';
import { Subscription } from 'rxjs';
import { CityService } from '../../services/city.service';
import { Department } from '../../config/model/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styles: []
})
export class CityComponent implements OnInit {

  show:boolean = false;
  model:City;
  modelUp:City;
  cities:City[] = [];
  @Output()
  emitter = new EventEmitter<boolean>();
  subscription:Subscription;
  departments:Department[] = [];

  constructor(private cityService:CityService,
              private departmentService:DepartmentService) { }

  ngOnInit() {
    this.listCities();
    this.listDepartments();
    this.init();
  }

  listCities(){
    this.cityService.listCity().subscribe((res:any)=>{
      this.cities = res;
    });
  }

  listDepartments(){
    this.departmentService.listDepartment().subscribe((res:any)=>{
      this.departments = res;
    });
  }

  init(){
    this.model = {
      id:null,
      code:null,
      name:null,
      departmentId:null
    }
  }

  init2(){
    this.modelUp = {
      id:null,
      code:null,
      name:null,
      departmentId:null
    }
  }

  render(){
    this.subscription = this.cityService.observable.subscribe(()=>{
        this.listCities();
        this.emitter.emit(true);
    });
  }

  save(city:City){

    if(city.code == null || city.name == "" || city.departmentId == null){
        swal('Code, Name and Department is required','','warning');
        return;
    }

    this.cityService.save(city);
    this.init();
    this.render();
  }

  showCard(){
    this.show = true;
  }

  update(city:City){
    if(city.code == null || city.name == "" || city.departmentId == null){
      swal('Code, Name and Department is required','','warning');
      return;
    }

    if(city.id == null){
      swal('Pleasse','id null, contact technical service','warning');
      return;
    }else{
      this.cityService.update(city);
      this.init2();
      this.show = false;
      this.render();
    }
  }

  delete(id:number){
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
          this.cityService.delete(id);
            this.render();
        }
    });
  }
}
