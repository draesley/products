import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../config/model/user';
import { UserService } from '../../pages/services/user.service';
import { RoleService } from '../../pages/services/role.service';
import { Role } from '../../config/model/role';
import {Md5} from "md5-typescript";
import { ContactService } from '../services/contact.service';
import { Contact } from '../../config/model/contact';
import { element } from 'protractor';
import { UploadFileService } from '../services/upload-file.service';

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
  contact:Contact;
  userImg:User;
  showimg:boolean = false;
  imgUp:File;


  constructor(private userService:UserService,
              private roleService:RoleService,
              private contactService:ContactService,
              private uploadFileService:UploadFileService) { }

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

    this.userService.findByEmail(user.name).subscribe((res:any)=>{
        if(res){
          swal('Username already exist','','info');
          return;
        }else{
          user.password = Md5.init(user.password);
          this.userService.save(user);
          this.render();
          this.show = false;
          this.init();
        }
    });
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

  saveImage(){
    this.userService.uploadImg(this.imgUp, this.userImg.id);
  }

  changeImg(file:File){

      if(file.type.indexOf('image') < 0){
          swal('selecting file is not an image','','info');
          return;
      }

      if(!file){
        return;
      }

      this.imgUp = file;
  }

}
