import { Injectable } from '@angular/core';
import { API_ROUTE } from '../../config/apirute';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../../config/model/location';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  listLocation(){
    let url = API_ROUTE + 'location';
    return this.http.get(url);
  }

  save(location:Location){
    let url = API_ROUTE + 'location';
    url += '?token=' + this.userService.token;
    this.http.post(url,location).subscribe(()=>{
        swal('Location Save','','success');
        this.subject.next();
    });
  }

  update(location:Location){
    let url = API_ROUTE + 'location/' + location._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,location).subscribe(()=>{
        swal('Location Upload','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'location/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
        swal('Location Removed','','success');
        this.subject.next();
    });
  }
}