import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import { User } from '../../config/model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new Subject;
  public observable = this.subject.asObservable();
  headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  jwt = new JwtHelperService();
  token:any;
  user:User;
  userRole:string = "";
  
  constructor(private http:HttpClient,
              private router:Router) { 
                this.loadStorage();
              }

  loadStorage(){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = this.user.id;
    }else{
      this.user = null,
      this.token = null;
    }
  }

  logOut(){
    this.user = null;
    this.token = null;
    this.userRole = "";
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
  listUser(){
    let url = API_ROUTE + 'user/findAll';
    return this.http.get(url);
  }

  save(user:User){
    let url = API_ROUTE + 'user/save';
    this.http.post(url,user).subscribe(()=>{
        swal('User Created','','success');
        this.subject.next();
    });
  }


  update(user:User){
    let url = API_ROUTE + 'user/update';
    this.http.put(url,user).subscribe(()=>{
        swal('User Update','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'user/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
        swal('User Removed','','success');
        this.subject.next();
    });
  }

  findByEmail(name:string){
    var name = name;
    let url = API_ROUTE + 'user/findByEmail';
    return this.http.post(url,name,httpOptions);
  }

  loginGoogle(token:string){
    let url = API_ROUTE + 'user/tokensignin';
    return this.http.post(url,token)
  }

  login(user:User){

    this.token = user.id;
    localStorage.setItem('user',JSON.stringify(user));
    this.userRole = user.roleId.name;
    this.router.navigate(['/pages']);
  }

  loginOk(){
    return (this.token > 0) ? true : false;
  }
}
