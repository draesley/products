import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../../config/apirute';
import { AttributeProduct } from '../../config/model/attributeproduct';


@Injectable({
  providedIn: 'root'
})
export class AttributeproductService {

  private subject = new Subject;
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient) { }

  listAttributeProduct(){
    let url = API_ROUTE + 'attributeProducts/findAll';
    return this.http.get(url);
  }

  save(attributepro:AttributeProduct){
    let url = API_ROUTE + 'attributeProducts/save';
    this.http.post(url,attributepro).subscribe(()=>{
        swal('Attribute of Product Save','','success');
        this.subject.next();
    });
  }

  update(attributepro:AttributeProduct){
    let url = API_ROUTE + 'attributeProducts/update';
    this.http.put(url,attributepro).subscribe(()=>{
        swal('Attribute of Product Update','','success');
        this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'attributeProducts/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
        swal('Attribute of Product Removed','','success');
        this.subject.next();
    });
  }
}
