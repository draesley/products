import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../config/apirute';
import { Role } from '../config/model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }

  listRoles(){
    let url = API_ROUTE + 'role/findAll';
    return this.http.get(url);
  }

  save(role:Role){
    let url = API_ROUTE + 'role/save';
    this.http.post(url,role).subscribe(()=>{
        swal('Role Created','','success');
        this.subject.next();
    });
  }

  update(role:Role){
    let url = API_ROUTE + 'role/update';
    this.http.put(url,role).subscribe(()=>{
        swal('Role Update','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'role/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
        swal('Role Removed','','success');
        this.subject.next();
    });
  }

}
