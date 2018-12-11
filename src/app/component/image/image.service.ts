import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public type:string;
  public id:string;
  public oculto:string = "oculto";
  @Output()
  public emitter = new EventEmitter<any>();


  constructor() {
    
   }

   showModal(type:string, id:string){
      this.oculto = "";
      this.type = type;
      this.id = id;
   }

   hiddenModal(){
      this.oculto = "oculto";
      this.type = "";
      this.id = "";
   }
}
