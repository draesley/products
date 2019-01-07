import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../pages/services/upload-file.service';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {

  uploadimg:File;
  imgTemp:any;

  constructor(public uploadService:UploadFileService,
              public imageService:ImageService) { }

  ngOnInit() {
  }

  hiddenModal(){
    this.uploadimg = null;
    this.imgTemp = null;
    this.imageService.hiddenModal();
  }

  selectedImg(file:File){

    if(!file){
        this.uploadimg = null;
        return;
    };

    if(file.type.indexOf('image') < 0 ){
      swal('Only Image','','info');
      this.uploadimg = null;
      return;
    };

    this.uploadimg = file;

    let reader = new FileReader();
    let imgtem2 = reader.readAsDataURL(file);
    reader.onloadend = () =>{
        this.imgTemp = reader.result;
    };

  }

  uploadImgs(){
    this.uploadService.uploadFile(this.uploadimg, this.imageService.type, this.imageService.id)
    .then(res => {
        this.imageService.emitter.emit(res);
        this.hiddenModal();
    })
    .catch( err =>{
      console.log("error en la carga");
    })
  }
}