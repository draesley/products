import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import swal from 'sweetalert';
import { Attribute } from '../../config/model/attribute';
import { Subject } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  attribute:Attribute;
  subject = new Subject<any>();
  observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  getlist(){
    let url = API_ROUTE + "attribute";
    return this.http.get(url);
  }

  save(attribute:Attribute){
    let url = `${API_ROUTE + 'attribute'}`;
    url += '?token=' + this.userService.token;
    this.http.post(url,attribute).subscribe(()=>{
      swal('Save ok',attribute.name,'success');
      this.subject.next();
    });
  }

  update(attribute:Attribute){
    let url = API_ROUTE + 'attribute/' + attribute._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,attribute).subscribe(()=>{
      swal('Update ok',attribute.name,'success');
    });
  }

  delete(id:number){
    let url =`${API_ROUTE + 'attribute/' + id}`;
    url += '?token=' + this.userService.token;
    this.subject.next();
    return this.http.delete(url);
  }
}
