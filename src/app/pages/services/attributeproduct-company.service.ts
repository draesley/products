import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import { AttributeProductCompany } from '../../config/model/attribute.product.ompany';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeproductCompanyService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }


  listAttributeProductCompany(){
    let url = API_ROUTE + 'productCompany';
    return this.http.get(url);
  }

  listProductForCompany(id:string){
    console.log(id+"este es el id" );
    let url = API_ROUTE + 'productCompany/company/' + id;
    return this.http.get(url);
  }

  listCompaniesForProduct(id:string){
    let url = API_ROUTE + 'productCompany/' + id;
    return this.http.get(url);
  }

  companiesPaginado(index:number = 0, id){
    let url = API_ROUTE + 'productCompany/pagina/' + id;
    url += '?index=' + index;
    return this.http.get(url);
  }

  save(attriProCom:AttributeProductCompany){
    let url = API_ROUTE + 'productCompany';
    url += '?token=' + this.userService.token;
    this.http.post(url,attriProCom).subscribe(()=>{
      swal('Product Company Create','','success');
      this.subject.next();
    });
  }

  update(attriProCom:AttributeProductCompany){
    let url = API_ROUTE + 'productCompany/' + attriProCom._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,attriProCom).subscribe(()=>{
      swal('Product Company Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:string){
    let url = API_ROUTE + 'productCompany/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('Product Company Removed','','success');
      this.subject.next();
    });
  }
}