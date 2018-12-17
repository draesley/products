import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../../config/apirute';
import { Product } from '../../config/model/product';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private subject = new Subject<any>();
  public observable = this.subject.asObservable();

  constructor(private http:HttpClient,
              private userService:UserService) { }

  listProduct(){
    let url = API_ROUTE + 'product';
    return this.http.get(url);
  }

  searchProduct(index:string){
    let url = API_ROUTE + 'search/product/' + index;
    return this.http.get(url);
  }

  save(product:Product){
    let url = API_ROUTE + 'product';
    url += '?token=' + this.userService.token;
    this.http.post(url, product).subscribe(()=>{
        swal('Product Save','','success');
        this.subject.next();
    });
  }

  update(product:Product){
    let url = API_ROUTE + 'product/' + product._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,product).subscribe(()=>{
      swal('Product Update','','success');
      this.subject.next();
    });
  }

  deleteById(id:number){
    let url = API_ROUTE + 'product/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('Product Delete','','success');
      this.subject.next();
    });
  }
}
