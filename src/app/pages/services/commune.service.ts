import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../../config/apirute';
import { Commune } from '../../config/model/commune';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  private subject = new Subject;
  public observable = this.subject.asObservable();


  constructor(private http:HttpClient) { }

  listCommunes(){
    let url = API_ROUTE + 'commune/findAll';
    return this.http.get(url);
  }

  save(commune:Commune){
    let url = API_ROUTE + 'commune/save';
    this.http.post(url,commune).subscribe(()=>{
      swal('Commune Save','','success');
      this.subject.next();
    });
  }

  update(commune:Commune){
    let url = API_ROUTE + 'commune/update';
    this.http.put(url,commune).subscribe(()=>{
      swal('Commune Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'commune/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
      swal('Commune Remove','','success');
      this.subject.next();
    });
  }
}
