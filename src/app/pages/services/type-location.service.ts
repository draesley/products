import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import { TypeLocation } from '../../config/model/type.location';

@Injectable({
  providedIn: 'root'
})
export class TypeLocationService {

  private subject = new Subject;
  public observable = this.subject.asObservable();


  constructor(private http:HttpClient) { }

  listTypeLocation(){
    let url = API_ROUTE + 'typeLocation/findAll';
    return this.http.get(url);
  }

  save(typeLocation:TypeLocation){
    let url = API_ROUTE + 'typeLocation/save';
    this.http.post(url,typeLocation).subscribe(()=>{
      swal('TypeLocation Save','','success');
      this.subject.next();
    });
  }

  update(typeLocation:TypeLocation){
    let url = API_ROUTE + 'typeLocation/update';
    this.http.put(url,typeLocation).subscribe(()=>{
      swal('TypeLocation Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'typeLocation/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
      swal('TypeLocation Remove','','success');
      this.subject.next();
    });
  }
}
