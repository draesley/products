import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ServiceCompany } from '../../config/model/serviceCompany';
import { Company } from '../../config/model/company';
import { ServicesCompanyService } from '../services/services-company.service';
import { Service } from '../../config/model/service';
import { ServiceService } from '../services/service.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-services-company',
  templateUrl: './services-company.component.html',
  styleUrls: ['./services-company.component.css']
})
export class ServicesCompanyComponent implements OnInit {

  subscription: Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();
  model:ServiceCompany;
  modelUp:ServiceCompany;
  servicesCompany:ServiceCompany[] = [];
  companies:Company[] = [];
  show:boolean = false;
  showup:boolean = false;
  services:Service[] = [];

  constructor(private router:Router,
              public servicesCompanyService:ServicesCompanyService,
              public serviceService:ServiceService,
              public companyService:CompanyService) { }

  ngOnInit() {
    this.init();
    this.init2();
    this.listServicesCompany();
    this.chargeList();
  }

  init(){
    this.model ={
      _id:null,
      description:"",
      company:null,
      service:null
    }
  }

  init2(){
    this.modelUp ={
      _id:null,
      description:"",
      company:null,
      service:null
    }
  }

  render(){
    this.subscription = this.servicesCompanyService.observable.subscribe(()=>{
      this.listServicesCompany();
      this.emitter.emit(true);
    });
  }

  listServicesCompany(){
      this.servicesCompanyService.listServiceCompany().subscribe((res:any)=>{
        this.servicesCompany = res.services;
        console.log(this.servicesCompany);
      });
  }

  chargeList(){
      this.companyService.listCompany().subscribe((res:any)=>{
        this.companies = res.companies;
      });

      this.serviceService.findServices().subscribe((res:any)=>{
          this.services = res.services;
      });
  }

  save(serviceCompany:ServiceCompany){
      this.servicesCompanyService.save(serviceCompany);
      this.init();
      this.show = false;
      this.render();
  }

  update(serviceCompany:ServiceCompany){
    this.servicesCompanyService.update(serviceCompany);
      this.init2();
      this.showup = false;
      this.render();
  }

  deleteById(id:string){
    if(id == null){
      swal('contact technical service','Service Company id is required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Service Company?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.servicesCompanyService.deleteById(id);
        this.render();
      }
    });
  }
}