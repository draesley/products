import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  menu(role){
  
    let Menu = [
      {
          title:'Main User',
          icon:'fa fa-folder-open-o',
          submenu:[
              {
                  title:'Product',
                  url:'/pages/product'
              }
          ]
      },
      {
          title:'Maintenance',
          icon:'fa fa-gear',
          submenu:[
              {
                  title:'Attribute',
                  url:'/pages/attribute'
              },
              {
                  title:'Category',
                  url:'/pages/category'
              },
              {
                  title:'Line',
                  url:'/pages/line'
              },
              {
                  title:'SubLine',
                  url:'/pages/subline'
              },
              {
                  title:'Product',
                  url:'/pages/product'
              },
              {
                  title:'Department',
                  url:'/pages/department'
              },
              {
                  title:'City',
                  url:'/pages/city'
              },
              {
                  title:'Commune',
                  url:'/pages/commune'
                  
              },
              {
                  title:'Type-location',
                  url:'/pages/type-location' 
              },
              {
                  title:'Role',
                  url:'/pages/role'
              },
              {
                  title:'User',
                  url:'/pages/user'
              },
              {
                  title:'Location',
                  url:'/pages/location' 
              },
              {
                  title:'Contact',
                  url:'/pages/contact'
              },
              {
                  title:'Company',
                  url:'/pages/company'
              },
              {
                  title:'Attribute-Product',
                  url:'/pages/attributeproduct'
              },
              {
                  title:'Product-Company',
                  url:'/pages/attribute-prodcut-company'
              }
          ]
      }
    ];
    if(role === "administrador"){
      this.menu[0].submenu.unshift({title:'Attribute', url:'/pages/attribute'});
    }
    return this.menu;
  }
  
}
