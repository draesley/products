import { Component, OnInit } from '@angular/core';
import { User } from '../../config/model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user:User;
  uploadimg: File;
  imgTemp:any;

  constructor(private userService:UserService) {
    this.user = this.userService.user; 
   }

  ngOnInit() {
   
  }

  update(user:User){

    this.user.name = user.name;

    if(!user.google){
      this.user.email = user.email;
    };
  
    this.userService.update(this.user);
  }

  selectedImg(file:File){

    if(!file){
        this.uploadimg = null;
        return;
    };

    if(file.type.indexOf('image') < 0 ){
      swal('Only Image','','info');
      this.uploadimg = null;
      return;
    };

    this.uploadimg = file;

    let reader = new FileReader();
    let imgtem2 = reader.readAsDataURL(file);
    reader.onloadend = () =>{
        this.imgTemp = reader.result;
    };

  }

  changeImg(){
    this.userService.changeImg(this.uploadimg, this.user._id);
  }
}
