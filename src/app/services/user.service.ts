import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../config/apirute';
import { User } from '../config/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }

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
}
