import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../pages/services/user.service';
import { User } from '../config/model/user';
import { Router } from '@angular/router';

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
  rememberme:boolean = false;
  email:string;


  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    initPlugin();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 0){
      this.rememberme = true;
    }
    //this.googleInit();
  }

 /*  googleInit(){
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
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token).subscribe(()=>{
        return this.router.navigate(['/pages']);
      });
    });
  } */ 

  signOut() {
      this.auth2 = gapi.auth2.getAuthInstance();
      this.auth2.signOut().then(function() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        localStorage.removeItem('id');
      });
  }

  login(data:NgForm){
   let user = new User(null, data.value.email, data.value.password);
   this.userService.login(user, data.value.rememberme).subscribe(() => {
     //this.userService.loginOk();
     return this.router.navigate(['/pages']);
   });
  }
}