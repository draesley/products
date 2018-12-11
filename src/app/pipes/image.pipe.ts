import { Pipe, PipeTransform } from '@angular/core';
import { API_ROUTE } from '../config/apirute';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type:string = "user"): any {

    var url = API_ROUTE + 'img';

    if(!img){
      return url += '/user/xxxx';
    };

    if(img.indexOf('https') >= 0){
      return img;
    };
  
    switch(type){
      case 'user':
        url += '/user/' + img;
      break;

      case 'company':
        url += '/company/' + img;
      break;

      case 'product':
        url += '/product/' + img;
      break;

      default:
        swal('Type user, company, product','','info');
    }

    return url;
  }

}
