import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../config/apirute';
import { AttributeProductCompany } from '../config/model/attribute.product.ompany';

@Injectable({
  providedIn: 'root'
})
export class AttributeproductCompanyService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }


  listAttributeProductCompany(){
    let url = API_ROUTE + 'attributeProductCompany/findAll';
    return this.http.get(url);
  }

  save(attriProCom:AttributeProductCompany){
    let url = API_ROUTE + 'attributeProductCompany/save';
    this.http.post(url,attriProCom).subscribe(()=>{
      swal('Product Company Create','','success');
      this.subject.next();
    });
  }

  update(attriProCom:AttributeProductCompany){
    let url = API_ROUTE + 'attributeProductCompany/update';
    this.http.put(url,attriProCom).subscribe(()=>{
      swal('Product Company Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'attributeProductCompany/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
      swal('Product Company Removed','','success');
      this.subject.next();
    });
  }
}