import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import { User } from '../../config/model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UploadFileService } from './upload-file.service';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/config/model/company';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new Subject;
  public observable = this.subject.asObservable();
  headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  jwt = new JwtHelperService();
  token:string;
  user:User;
  menu:any[] = [];
  role:string = "";
  company:Company;
  
  constructor(private http:HttpClient,
              private router:Router,
              private uploadFileService:UploadFileService) { 
              this.loadStorage();
              //this.logOut();
              }

  loadStorage(){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.token = localStorage.getItem('token');
    }else{
      this.user = null,
      this.token = null;
      this.menu = [];
    }
  }

  localStorageSave(id:string, token:string, user:User, menu:any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
  }

  logOut(){
    this.user = null;
    this.token ="";
    this.company = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');
    localStorage.removeItem('company');
    this.router.navigate(['/']);
  }
  
  listUser(){
    let url = API_ROUTE + 'user';
    return this.http.get(url);
  };

  findByEmail(email:string){
    let url = API_ROUTE + 'user/email';
    url += '?token=' + this.token;
    return this.http.post(url,email).pipe(map((res:any)=>{
        return res;
    }));
  };

  save(user:User){
    let url = API_ROUTE + 'user';
    url += '?token=' + this.token;
    this.http.post(url,user).subscribe(()=>{
        swal('User Created','','success');
        this.subject.next();
    });
  };


  update(user:User){
    let url = API_ROUTE + 'user/' + user._id;
    url += '?token=' + this.token;
    this.http.put(url,user).subscribe((res:any)=>{
        
        let user: User = res.user;
        this.localStorageSave(user._id, this.token, user, this.menu)

        swal('User Update','','success');
        this.subject.next();
        return true;
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'user/' + id;
    url += '?token=' + this.token;
    this.http.delete(url).subscribe(()=>{
        swal('User Removed','','success');
        this.subject.next();
    });
  }

  loginGoogle(token:string){
    let url = API_ROUTE + 'login/google';
    return this.http.post(url,{token})
    .pipe(map((res:any)=>{
      this.localStorageSave(res.user._id, res.token, res.user, res.menu);
      this.loginOk();
      return res;
    }));
  }

  //login con js
  login(user:User, rememberme:boolean = false){

    if(rememberme){
      localStorage.setItem('email', user.email);
    }else{
      localStorage.removeItem('email');
    };

    let url = API_ROUTE + 'login';
    return this.http.post(url,user).pipe(
      map( (res:any)=>{
        console.log(res);
        localStorage.setItem('company', JSON.stringify(res.company));
        this.company = res.company;
        this.localStorageSave(res.user._id, res.token, res.user, res.menu);
        this.loginOk();
        return true;
      })
    );
  }

  loginOk(){

    if(this.token.length > 1){
      return true;
    }else{
      return false;
    }
    //return (this.token.length > 1) ? true : false;
  }

  changeImg(file:File, id:string){

    
    this.uploadFileService.uploadFile(file, 'user', id)
    .then((res:any) =>{
        this.user.img = res.user.img;
        swal('Image Update','','success');
        this.localStorageSave(id, this.token, this.user, this.menu)
        this.subject.next();
    })
    .catch(res =>{
        console.log(res);
    });
  }
}
