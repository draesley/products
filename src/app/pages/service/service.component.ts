import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Service } from 'src/app/config/model/service';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { ImageService } from '../../component/image/image.service';
import { CategoryService } from '../services/category.service';
import { Subline } from '../../config/model/subline';
import { CompanyService } from '../services/company.service';
import { Company } from '../../config/model/company';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services:Service[] = [];
  @Output()
  emmiter = new EventEmitter<boolean>();
  subscription:Subscription;
  model:Service;
  modelUp:Service;
  show:boolean = false;
  showup:boolean = false;
  sublines:Subline[] = [];
  companies:Company[] = [];

  constructor(public serviceService:ServiceService,
              public imageService:ImageService,
              public categoryService:CategoryService,
              public companyService:CompanyService) { }

  ngOnInit() {
    this.ListServices();
    this.listItem();
    this.init();
    this.init2();
  }

  init(){
    this.model = {
      _id:null,
      name:"",
      description:"",
      img:"",
      subline:null,
      company:null
    };
  }

  init2(){
    this.modelUp = {
      _id:null,
      name:"",
      description:"",
      img:"",
      subline:null,
      company:null
    };
  }

  render(){
    this.subscription = this.serviceService.observable.subscribe(()=>{
        this.ListServices();
        this.emmiter.emit(true);
    });
  }

  showModal(id:string){
    this.imageService.showModal('service', id);
  }

  ListServices(){
    this.serviceService.findServices().subscribe((res:any)=>{
      this.services = res.services;
    });
  }

  listItem(){
    this.categoryService.listSubLines().subscribe((res:any)=>{
        this.sublines = res.sublines;
    });

    this.companyService.listCompany().subscribe((res:any)=>{
        this.companies = res.companies
    });
  }

  search(index:string){

  }

  save(service:Service){
    if(service.name == "" || service.description == "" || service.subline == null || service.company == null){
      swal('Product','The Name, Description, subline and Category fields are required','warning');
      return;
  }
  this.serviceService.save(service);
  this.render();
  this.init();
  this.show = false;
  }

  update(service:Service){

    if(service.name == "" || service.description == "" || service.subline == null || service.company== null){
      swal('Product','The Name, Description, subline and Category fields are required','warning');
      return;
    }

    this.serviceService.update(service);
    this.render();
    this.showup = false;
    this.init2();

  }

  delete(id:string){
    if(id == null){
      swal('Pleasse','service does not exist, contact technical service','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Service?',
      text:'ok',
      icon:'warning',
      dangerMode:true,
    })
    .then(deletes =>{
        if(deletes){
          this.serviceService.delete(id);
          this.render();
        }
    });
  }
}