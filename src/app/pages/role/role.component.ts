import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Subscription } from 'rxjs';
import { Role } from '../../config/model/role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styles: []
})
export class RoleComponent implements OnInit {

  subscription:Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();
  model:Role;
  modelUp:Role;
  show:boolean = false;
  roles:Role[] = [];

  constructor(private roleService:RoleService) { }

  ngOnInit() {
    this.init();
    this.render();
    this.listRoles();
  }

  init(){
    this.model = {
      id:null,
      name:""
    };
  }

  init2(){
    this.modelUp = {
      id:null,
      name:""
    };
  }

  render(){
    this.subscription = this.roleService.observable.subscribe(()=>{
      this.listRoles();
      this.emitter.emit(true);
    });
  }

  showCard(){
    this.show = true;
  }

  listRoles(){
      this.roleService.listRoles().subscribe((res:any)=>{
        this.roles = res;
      });
  }

  save(role:Role){
    if(role.name == ""){
      swal('Role Name is required','','warning');
      return;
    }

    let index = 0;
    this.roles.forEach(element => {
      if(role.name === element.name){
        index += 1;
      }
    });

    if(index > 0){
      swal('Name Already Exists','','warning');
      return;
    }else{
      this.roleService.save(role);
      this.init();
      this.render();
    }
  }

  update(role:Role){
    if(role.name == ""){
      swal('Role Name is required','','warning');
      return;
    }

    if(role.id == null){
      swal('contact technical service','Role id is required','warning');
      return;
    }

    this.roleService.update(role);
    this.init2();
    this.show = false;
    this.render();
  }

  deleteById(id:number){
    if(id == null){
      swal('contact technical service','Role Id is required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Role?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.roleService.deleteById(id);
        this.render();
      }
    });
  }

}
