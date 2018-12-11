import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../../config/apirute';
import { Department } from '../../config/model/department';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  listDepartment(){
    let url = API_ROUTE + 'department';
    return this.http.get(url);
  }

  save(department:Department){
    let url = API_ROUTE + 'department';
    url += '?token=' + this.userService.token;
    this.http.post(url,department).subscribe(()=>{
      swal('Department save','','success');
      this.subject.next();
    });
  }

  update(department:Department){
    let url = API_ROUTE + 'department/' + department._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,department).subscribe(()=>{
      swal('Department Update','','success');
      this.subject.next();
    });
  }

  delete(id:number){
    let url = API_ROUTE + 'department/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('Department Delete','','success');
      this.subject.next();
    });
  }
}
