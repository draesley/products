import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../config/model/product';
import { ProductService } from '../pages/services/product.service';
import { AttributeproductCompanyService } from '../pages/services/attributeproduct-company.service';
import { Company } from '../config/model/company';
import { AttributeProductCompany } from '../config/model/attribute.product.ompany';

declare function initPlugin();

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  product:Product;
  companies:AttributeProductCompany[] = [];

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public productService:ProductService,
              public companiesProduct:AttributeproductCompanyService) { 

                activatedRoute.params.subscribe(params =>{
                  let id = params['id'];
                  this.findProduct(id);
                  this.listCompanies(id);
                })
              }

  ngOnInit() {
    initPlugin();
    this.init();
  }

  init(){
    this.product = {
      _id:null,
      name:"",
      detail:"",
      img:"",
      subline:null
    }
  }

  findProduct(id){
    this.productService.findById(id).subscribe((res:any)=>{
        this.product = res.product;
    });
  }

  listCompanies(id:string){
    this.companiesProduct.listCompaniesForProduct(id).subscribe((res:any)=>{
        this.companies = res.companies;
        console.log(this.companies);
    });
  }

}
