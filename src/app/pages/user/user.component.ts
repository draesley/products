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
import { ImageService } from '../../component/image/image.service';

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
              private uploadFileService:UploadFileService,
              public imageService:ImageService) { }

  ngOnInit() {
    this.init();
    this.listUsers();
    this.listRoles();
    this.imageService.emitter.subscribe(res => this.listUsers());
  }

  init(){
    this.model = {
      _id:"",
      name:"",
      email:"",
      img:"",
      password:"",
      role:null
    }
  }

  init2(){
    this.modelUp = {
      _id:"",
      name:"",
      email:"",
      img:"",
      password:"",
      role:null
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
      this.users = res.users;
    });
  }

  listRoles(){
    this.roleService.listRoles().subscribe((res:any)=>{
        this.roles = res.roles;
    });
  }

  save(user:User){
    let index = 0;
    if(user.name == "" || user.password == "" || user.role == null){
      swal('Name, Password and Role is required','','warning');
      return;
    };

    this.users.forEach(element => {
        if(user.email === element.email){
            index +=1;
            swal('Username already exist','','info');
            return;
        }
    });
 
          //user.password = Md5.init(user.password);
          user.google = false;
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

    if(user._id == null){
      swal('contact technical service','User id is required','warning');
      return;
    }
    
    //user.password = Md5.init(user.password);
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
    this.userService.changeImg(this.imgUp, this.userImg._id);
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

  showModal(id:string){
    this.imageService.showModal('user', id);
  }

}
