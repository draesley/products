import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from '../config/apirute';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  listMenu(id:number){
      let url = API_ROUTE + "menu/findMenu/" + id;
      return this.http.get(url);
  }

}
