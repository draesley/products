import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../config/apirute';
import { Company } from '../config/model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }

  listCompany(){
    let url = API_ROUTE + 'company/findAll';
    return this.http.get(url);
  }

  save(company:Company){
    let url = API_ROUTE + 'company/save';
    this.http.post(url,company).subscribe(()=>{
      swal('Company Created','','success');
      this.subject.next();
    });
  }

  update(company:Company){
    let url = API_ROUTE + 'company/update';
    this.http.put(url,company).subscribe(()=>{
      swal('Company Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'company/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
      swal('Company Removed','','success');
      this.subject.next();
    });
  }
}
