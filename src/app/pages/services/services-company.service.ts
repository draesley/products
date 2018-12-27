import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceCompany } from '../../config/model/serviceCompany';
import { API_ROUTE } from '../../config/apirute';
import { UserService } from './user.service';
import { Subject } from 'rxjs/internal/Subject';


@Injectable({
  providedIn: 'root'
})
export class ServicesCompanyService {

  serviceCompany:ServiceCompany;
  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  listServiceCompany(){
    let url = API_ROUTE + 'serviceCompany';
    return this.http.get(url);
  }

  listCompaniesForService(id:string){
    let url = API_ROUTE + 'serviceCompany/' + id;
    return this.http.get(url);
  }

  /* companiesPaginado(index:number = 0, id){
    let url = API_ROUTE + 'serviceCompany/pagina/' + id;
    url += '?index=' + index;
    return this.http.get(url);
  } */

  save(serviceCompany:ServiceCompany){
    let url = API_ROUTE + 'serviceCompany';
    url += '?token=' + this.userService.token;
    this.http.post(url,serviceCompany).subscribe(()=>{
      swal('Service Company Create','','success');
      this.subject.next();
    });
  }

  update(serviceCompany:ServiceCompany){
    console.log(serviceCompany);
    let url = API_ROUTE + 'serviceCompany/' + serviceCompany._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,serviceCompany).subscribe(()=>{
      swal('Service Company Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:string){
    let url = API_ROUTE + 'serviceCompany/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('Service Company Removed','','success');
      this.subject.next();
    });
  }
}
