import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../pages/services/user.service';
import { User } from '../config/model/user';
import {Md5} from "md5-typescript";
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User[]= [];


  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
  }

  login(data:NgForm){
  
    console.log(data.valid);
    console.log(data.value);
  
   this.userService.listUser().subscribe((res:any)=>{
      this.user = res;
      let pass = Md5.init(data.value.password);
      this.user.forEach(element => {
        if(element.name === data.value.email){
          this.router.navigate(['/pages']);
        }else{
          //swal('Email o Password failed','','warning');
          console.log('failed login');
          return;
        }
      });
    });
  }
}