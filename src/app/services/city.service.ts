import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../config/apirute';
import { City } from '../config/model/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }

  listCity(){
    let url = API_ROUTE + 'city/findAll';
    return this.http.get(url);
  }

  save(city:City){
    let url = API_ROUTE + 'city/save';
    this.http.post(url,city).subscribe(()=>{
      swal('City Create','','success');
      this.subject.next();
    });
  }

  update(city:City){
    let url = API_ROUTE + 'city/update';
    this.http.put(url,city).subscribe(()=>{
      swal('City Update','','success');
      this.subject.next();
    });
  }

  delete(id:number){
    let url = API_ROUTE + 'city/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
      swal('City Remove','','success');
      this.subject.next();
    });
  }

}
