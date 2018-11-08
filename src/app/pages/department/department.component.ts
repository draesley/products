import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Department } from '../../config/model/department';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {

  model:Department;
  modelUp:Department;
  departments:Department[] = [];
  @Output()
  emitter = new EventEmitter<boolean>();
  subscription: Subscription;
  show:boolean = false;



  constructor(private departmentservice:DepartmentService) { }

  ngOnInit() {
    this.init();
    this.listDepartment();
  }

  init(){
    this.model ={
      id:null,
      code:null,
      name:""
    }
  }

  init2(){
    this.modelUp ={
      id:null,
      code:null,
      name:""
    }
  }

  render(){
    this.subscription = this.departmentservice.observable.subscribe(()=>{
      this.listDepartment();
      this.emitter.emit(true);
    });
  }

  showCard(){
    this.show = true;
  }

  listDepartment(){
    this.departmentservice.listDepartment().subscribe((res:any)=>{
      this.departments = res;
    });
  }

  save(department:Department){
    if(department.code == null || department.name == ""){
      swal('Name and Code is required','','warning');
      return;
    }

    let index = 0;
    this.departments.forEach(element => {
      if(department.name === element.name || department.code === element.code){
          index += 1;
      }
    });

    if(index > 0){
      swal('Department already','','warning');
      return;
    }else{
      this.departmentservice.save(department);
      this.init();
      this.render();
    }
  }

  update(department:Department){
      if(department.code == null || department.name == ""){
        swal('Name and Code is required','','warning');
        return;
      }

      if(department.id == null){
        swal('Id null, contact technical service','warning');
        return;
      }else{
        this.departmentservice.update(department);
        this.init2();
        this.show = false;
        this.render();
      }
  }

  delete(id:number){
    if(id == null){
      swal('Id null, contact technical service','warning');
      return;
    }

    swal({
      title:'you are sure to delete this Department?',
      text:'ok',
      icon:'warning',
      dangerMode:true
    })
    .then(deletes=>{
        if(deletes){
          this.departmentservice.delete(id);
          this.render();
        }
    });
  }

}
