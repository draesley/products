import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import { Company } from '../../config/model/company';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  listCompany(){
    let url = API_ROUTE + 'company';
    return this.http.get(url);
  }

  save(company:Company){
    let url = API_ROUTE + 'company';
    url += '?token=' + this.userService.token;
    this.http.post(url,company).subscribe(()=>{
      swal('Company Created','','success');
      this.subject.next();
    });
  }

  update(company:Company){
    let url = API_ROUTE + 'company/' + company._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,company).subscribe(()=>{
      swal('Company Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'company/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('Company Removed','','success');
      this.subject.next();
    });
  }
}
