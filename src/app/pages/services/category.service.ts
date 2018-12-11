import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_ROUTE } from '../../config/apirute';
import { Category } from '../../config/model/category';
import { UserService } from './user.service';
import { Line } from '../../config/model/line';
import { Subline } from '../../config/model/subline';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,
            private userService:UserService) { }

  private subject = new Subject<any>();
  public observable = this.subject.asObservable();

  //Category

  listCategory(){
    let url = API_ROUTE + 'category';
    return this.http.get(url);
  }

  saveCategory(category:Category){
      let url = API_ROUTE + 'category';
      url += '?token=' + this.userService.token; 
      this.http.post(url,category).subscribe(()=>{
        swal('Category','Save ok','success');
        this.subject.next();
      });
  }

  updateCategory(category:Category){
    let url = API_ROUTE + 'category/'+ category._id;
    url += '?token=' + this.userService.token;
    this.http.put(url,category).subscribe(()=>{
      swal('Category','Update ok','success');
      this.subject.next();
    })
  }

  deleteByIdCategory(id:number){
    let url = API_ROUTE + 'category/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('category','removed','success');
      this.subject.next();
    });
  }

  // lineas

  listLines(){
    let url = API_ROUTE + 'line';
    return this.http.get(url);
  }

  saveLine(line:Line){
    let url = API_ROUTE + 'line';
    url += '?token=' + this.userService.token;
    this.http.post(url,line).subscribe(()=>{
      swal('Line','Save','success');
      this.subject.next();
    });
  }

  updateLine(line:Line){
    let url = API_ROUTE + 'line/' + line._id;
    url += '?token=' + this.userService.token;
    this.http.put(url, line).subscribe(()=>{
      swal('Line Update',line.name,'success');
      this.subject.next();
    });
  }

  deleteByIdLine(id:number){
    let url = API_ROUTE + 'line/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('Line','removed','success');
      this.subject.next();
    });
  }

  //sublines

  listSubLines(){
    let url = API_ROUTE + 'subline';
    return this.http.get(url);
  }

  saveSubLine(subline:Subline){
    let url = API_ROUTE + "subline";
    url += '?token=' + this.userService.token;
    this.http.post(url,subline).subscribe(()=>{
      swal('subline','Save','success');
      this.subject.next();
    });
  }

  updateSubLine(subline:Subline){
    let url = API_ROUTE + 'subline/' + subline._id;
    url += '?token=' + this.userService.token;
    this.http.put(url, subline).subscribe(()=>{
      swal('Line Update',subline.name,'success');
      this.subject.next();
    });
  }

  deleteByIdSubline(id:number){
    let url = API_ROUTE + 'subline/' + id;
    url += '?token=' + this.userService.token;
    this.http.delete(url).subscribe(()=>{
      swal('subline','removed','success');
      this.subject.next();
    });
  }
}
