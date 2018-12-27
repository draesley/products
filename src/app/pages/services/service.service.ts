import { Injectable } from '@angular/core';
import { API_ROUTE } from '../../config/apirute';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/config/model/service';
import { UserService } from './user.service';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private subject = new Subject<any>();
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  findServices(){
    let url = API_ROUTE + 'services';
    return this.http.get(url);
  }

  findById(id:string){
    let url = API_ROUTE + 'services/' + id;
    return this.http.get(url);
  }

  searchService(index:string){
    let url = API_ROUTE + 'search/service/' + index;
    return this.http.get(url);
  }

  save(service:Service){
    let url = API_ROUTE + 'services';
    url += '?token=' + this.userService.token;
    this.http.post(url,service).subscribe((res:any)=>{
      swal('Service save','','success');
      this.subject.next();
    });
  }

  update(service:Service){
    let url = API_ROUTE + 'services/' + service._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,service).subscribe((res:any)=>{
      swal('Service update','','success');
      this.subject.next();
    });
  }

  delete(id:string){
    let url = API_ROUTE + 'services/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe((res:any)=>{
      swal('Service Removed','','success');
      this.subject.next();
    });
  }


}