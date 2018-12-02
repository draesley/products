import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../pages/services/user.service';
import { User } from '../config/model/user';
import {Md5} from "md5-typescript";
import { Router } from '@angular/router';
import { element } from 'protractor';
import { getTestBed } from '@angular/core/testing';

declare const gapi:any;
declare function initPlugin();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  auth2:any;


  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    initPlugin();
    this.googleInit();
  }

  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id:"321737821544-hhnsrpur58sbodbh202olual3ptprava.apps.googleusercontent.com",
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
     
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token).subscribe((res:any)=>{
        this.userService.findByEmail(profile.U3).subscribe((res:any)=>{
          this.user = res;
          if(this.user == null){
            swal('Unregistered user','','error');
            return;
          }
              this.userService.login(this.user);
       });
        
      });
    });
  }

  signOut() {
      this.auth2 = gapi.auth2.getAuthInstance();
      this.auth2.signOut().then(function() {
        localStorage.clear();
      });
  }

  login(data:NgForm){

    if(data.value.email == "" || data.value.password == ""){
        swal('Email and Passwors is Required','','info');
        return;
    }
   
   this.userService.findByEmail(data.value.email).subscribe((res:any)=>{
      
      let pass = Md5.init(data.value.password);
      this.user = res;
      if(this.user == null || this.user.password != pass){
        swal('incorrect username or password','','error');
        return;
      }

      if(this.user.name === data.value.email || this.user.password === pass){
          this.userService.login(this.user);
      }

   });
  }
}