import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../../config/apirute';
import { Role } from '../../config/model/role';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  listRoles(){
    let url = API_ROUTE + 'role';
    return this.http.get(url);
  }

  save(role:Role){
    let url = API_ROUTE + 'role';
    url += '?token=' + this.userService.token;
    this.http.post(url,role).subscribe(()=>{
        swal('Role Created','','success');
        this.subject.next();
    });
  }

  update(role:Role){
    let url = API_ROUTE + 'role/' + role._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,role).subscribe(()=>{
        swal('Role Update','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'role/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
        swal('Role Removed','','success');
        this.subject.next();
    });
  }

}
