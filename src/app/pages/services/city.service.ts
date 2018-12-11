import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import { City } from '../../config/model/city';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  listCity(){
    let url = API_ROUTE + 'city';
    return this.http.get(url);
  }

  save(city:City){
    let url = API_ROUTE + 'city';
    url += '?token=' + this.userService.token;
    this.http.post(url,city).subscribe(()=>{
      swal('City Create','','success');
      this.subject.next();
    });
  }

  update(city:City){
    let url = API_ROUTE + 'city/update/' + city._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,city).subscribe(()=>{
      swal('City Update','','success');
      this.subject.next();
    });
  }

  delete(id:number){
    let url = API_ROUTE + 'city/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('City Remove','','success');
      this.subject.next();
    });
  }

}
