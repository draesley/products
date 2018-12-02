import { Injectable } from '@angular/core';
import { API_ROUTE } from '../../config/apirute';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file:File){
    
    return new Promise((resolve,reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();


      formData.append('file',file,file.name);
  
      xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log("img upload");
            resolve(JSON.parse(xhr.response));
          }else{
            console.log("error not uploag");
            reject(xhr.response);
          }
        }
      };
      let url = API_ROUTE + "image/loadFile";
      xhr.open('POST',url, true);
      xhr.send(formData);
    });
  }
}
