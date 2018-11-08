import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../config/model/user';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../config/model/role';
import {Md5} from "md5-typescript";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  Subscription = new Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();
  model:User;
  modelUp:User;
  users:User[] = [];
  show:boolean = false;
  showup:boolean = false;
  roles:Role[] = [];
  password2:string;


  constructor(private userService:UserService,
              private roleService:RoleService) { }

  ngOnInit() {
    this.init();
    this.listUsers();
    this.listRoles();
  }

  init(){
    this.model = {
      id:null,
      name:"",
      img:"",
      password:"",
      roleId:null
    }
  }

  init2(){
    this.modelUp = {
      id:null,
      name:"",
      img:"",
      password:"",
      roleId:null
    }
  }

  showCard(){
    this.showup = true;
  }

  render(){
    this.Subscription = this.userService.observable.subscribe(()=>{
      this.listUsers();
      this.emitter.emit(true);
    });
  }

  listUsers(){
    this.userService.listUser().subscribe((res:any)=>{
      this.users = res;
    });
  }

  listRoles(){
    this.roleService.listRoles().subscribe((res:any)=>{
        this.roles = res;
    });
  }

  save(user:User){

    if(user.name == "" || user.password == "" || user.roleId == null){
      swal('Name, Password and Role is required','','warning');
      return;
    };

    user.password = Md5.init(user.password);
    this.userService.save(user);
    this.render();
    this.show = false;
    this.init();
  }

  update(user:User){
    if(user.name == "" || user.password == ""){
      swal('Name, Password and Role is required','','warning');
      return;
    };

    if(user.id == null){
      swal('contact technical service','User id is required','warning');
      return;
    }
    
    user.password = Md5.init(user.password);
    this.userService.update(user);
    this.init2();
    this.showup = false;
    this.render();
  }

  deleteById(id:number){
    if(id == null){
      swal('contact technical service','User Id is required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this User?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.userService.deleteById(id);
        this.render();
      }
    });
  }

}
