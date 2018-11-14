import { Injectable } from '@angular/core';
import { API_ROUTE } from '../../config/apirute';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../../config/model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }

  listLocation(){
    let url = API_ROUTE + 'location/findAll';
    return this.http.get(url);
  }

  save(location:Location){
    let url = API_ROUTE + 'location/save';
    this.http.post(url,location).subscribe(()=>{
        swal('Location Save','','success');
        this.subject.next();
    });
  }

  update(location:Location){
    let url = API_ROUTE + 'location/update';
    this.http.put(url,location).subscribe(()=>{
        swal('Location Upload','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'location/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
        swal('Location Removed','','success');
        this.subject.next();
    });
  }
}