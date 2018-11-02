import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ROUTE } from '../config/apirute';
import swal from 'sweetalert';
import { Attribute } from '../config/model/attribute';
import { Subject } from 'rxjs';
import { httpOptions } from '../config/headers';


@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  attribute:Attribute;
  subject = new Subject<any>();
  observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }

  getlist(){
    let url = API_ROUTE + "/attribute/findAll";
    return this.http.get(url);
  }

  init(){
    
  }

  save(attribute:Attribute){
    let url = `${API_ROUTE + '/attribute/save'}`;
    this.http.post(url,attribute).subscribe(()=>{
      swal('Save ok',attribute.name,'success');
      this.subject.next();
    });
  }

  update(attribute:Attribute){
    let url = `${API_ROUTE + '/attribute/update'}`;
    this.http.put(url,attribute).subscribe(()=>{
      swal('Update ok',attribute.name,'success');
    });
  }

  delete(id:number){
    let url =`${API_ROUTE + '/attribute/deleteById/' + id}`;
    this.subject.next();
    return this.http.delete(url,httpOptions);
    //swal('Delete ok','success');
  }
}
