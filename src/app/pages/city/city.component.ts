import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { City } from '../../config/model/city';
import { Subscription } from 'rxjs';
import { CityService } from '../../pages/services/city.service';
import { Department } from '../../config/model/department';
import { DepartmentService } from '../../pages/services/department.service';

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
      this.cities = res.cities;
    });
  }

  listDepartments(){
    this.departmentService.listDepartment().subscribe((res:any)=>{
      this.departments = res.departments;
    });
  }

  init(){
    this.model = {
      _id:null,
      name:null,
      department:null
    }
  }

  init2(){
    this.modelUp = {
      _id:null,
      name:null,
      department:null
    }
  }

  render(){
    this.subscription = this.cityService.observable.subscribe(()=>{
        this.listCities();
        this.emitter.emit(true);
    });
  }

  save(city:City){

    if(city.name == "" || city.department == null){
        swal('Name and Department is required','','warning');
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
    if(city.name == "" || city.department == null){
      swal('Name and Department is required','','warning');
      return;
    }

    if(city._id == null){
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
