import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../config/apirute';
import { Contact } from '../config/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }


  listContacts(){
    let url = API_ROUTE + 'contact/findAll';
    return this.http.get(url);
  }
  
  save(contact:Contact){
    let url = API_ROUTE + 'contact/save';
    this.http.post(url,contact).subscribe(()=>{
        swal('Contact Created','','success');
        this.subject.next();
    });
  }

  update(contact:Contact){
    let url = API_ROUTE + 'contact/update';
    this.http.put(url,contact).subscribe(()=>{
        swal('Contact Update','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'contact/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
      swal('Contact Removed','','success');
      this.subject.next();
    });
  }
}
