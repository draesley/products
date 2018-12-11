import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../../config/apirute';
import { Contact } from '../../config/model/contact';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }


  listContacts(){
    let url = API_ROUTE + 'contact';
    return this.http.get(url);
  }
  
  save(contact:Contact){
    let url = API_ROUTE + 'contact';
    url += '?token=' + this.userService.token;
    this.http.post(url,contact).subscribe(()=>{
        swal('Contact Created','','success');
        this.subject.next();
    });
  }

  update(contact:Contact){
    let url = API_ROUTE + 'contact/' + contact._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,contact).subscribe(()=>{
        swal('Contact Update','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'contact/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('Contact Removed','','success');
      this.subject.next();
    });
  }
}
