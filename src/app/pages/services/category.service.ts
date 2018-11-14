import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../../config/apirute';
import { Category } from '../../config/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  private subject = new Subject<any>();
  public observable = this.subject.asObservable();

  //Category

  listCategory(){
    let url = API_ROUTE + 'category/findAllCategory';
    return this.http.get(url);
  }

  saveCategory(category:Category){
      let url = API_ROUTE + 'category/saveCategory';
      this.http.post(url,category).subscribe(()=>{
        swal('Category','Save ok','success');
        this.subject.next();
      });
  }

  updateCategory(category:Category){
    let url = API_ROUTE + 'category/updateCategory';
    this.http.put(url,category).subscribe(()=>{
      swal('Category','Update ok','success');
      this.subject.next();
    })
  }

  deleteByIdCategory(id:number){
    let url = API_ROUTE + 'category/deleteById/' + id;
    this.http.delete(url).subscribe(()=>{
      swal('category','removed','success');
      this.subject.next();
    });
  }

  // lineas

  listLines(){
    let url = API_ROUTE + 'category/findAllLineCategory';
    return this.http.get(url);
  }

  saveLine(category:Category){
    let url = API_ROUTE + 'category/saveLineAndSubCategory';
    this.http.post(url,category).subscribe(()=>{
      swal('Line','Save','success');
      this.subject.next();
    });
  }

  updateLine(category:Category){
    let url = API_ROUTE + 'category/updateLineAndSubCategory';
    this.http.put(url, category).subscribe(()=>{
      swal('Line Update',category.name,'success');
      this.subject.next();
    });
  }

  //subCategory

  listSubLines(){
    let url = API_ROUTE + 'category/findAllSubLineCategory';
    return this.http.get(url);
  }
}
