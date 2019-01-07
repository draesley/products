import { Component, OnInit } from '@angular/core';
import { Service } from '../config/model/service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../pages/services/service.service';
import { ServicesCompanyService } from '../pages/services/services-company.service';
import { ServiceCompany } from '../config/model/serviceCompany';

@Component({
  selector: 'app-company-service',
  templateUrl: './company-service.component.html',
  styleUrls: ['./company-service.component.css']
})
export class CompanyServiceComponent implements OnInit {

  index:number = 0;
  totalFiles:number= 0;
  service:Service;
  companies:ServiceCompany[] = [];
  

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public serviceService:ServiceService,
              public serviceCompanyService:ServicesCompanyService) { 

                this.activatedRoute.params.subscribe(params =>{
                    let id = params['id'];
                    this.listService(id);
                    this.listCompanies(id);
                });
              }

  ngOnInit() {
    this.init();
  }


  init(){
    this.service ={
      _id:null,
      name:"",
      description:"",
      img:null,
      subline:null
    }
  }

  listService(id:string){
    this.serviceService.findById(id).subscribe((res:any)=>{
      this.service = res.service;
    });
  }

  listCompanies(id:string){
    this.serviceCompanyService.listCompaniesForService(id).subscribe((res:any)=>{
      this.companies = res.companies;
       console.log(this.companies);
    });
  }

}
