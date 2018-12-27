import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttributeProductCompany } from '../../config/model/attribute.product.ompany';
import { AttributeProduct } from '../../config/model/attributeproduct';
import { Company } from '../../config/model/company';
import { AttributeproductCompanyService } from '../../pages/services/attributeproduct-company.service';
import { AttributeproductService } from '../../pages/services/attributeproduct.service';
import { CompanyService } from '../../pages/services/company.service';
import { ProductService } from '../services/product.service';
import { Product } from '../../config/model/product';
import { UserService } from '../services/user.service';

declare function initPlugin();

@Component({
  selector: 'app-attribute-product-company',
  templateUrl: './attribute-prodcut-company.component.html',
  styles: []
})
export class AttributeProdcutCompanyComponent implements OnInit {

  subscription: Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();
  model:AttributeProductCompany;
  modelUp:AttributeProductCompany;
  attributePC:AttributeProductCompany[] = [];
  products:Product[] = [];
  companies:Company[] = [];
  show:boolean = false;
  showup:boolean = false;
  company:Company;

  constructor(private APCService:AttributeproductCompanyService,
              private productService:ProductService,
              private companyService:CompanyService,
              public userService:UserService) { 
                this.company = this.userService.company;
              }

  ngOnInit() {
    initPlugin();
    this.init();
    //this.initCompany();
    this.listAPC();
    this.chargeList();

  }

  init(){
    this.model = {
      _id:"",
      price:null,
      secondprice:null,
      company:null,
      product:null
    };
  }

  initCompany(){
    this.company = {
      _id:"",
      nit:"",
      name:"",
      adress:"",
      phon:null,
      movil:null,
      img:"",
      email:"",
      location:null,
      contact:null,

    }
  }

  init2(){
    this.modelUp = {
      _id:"",
      price:null,
      secondprice:null,
      company:null,
      product:null
    };
  }

  render(){
    this.subscription = this.APCService.observable.subscribe(()=>{
      this.listAPC();
      this.emitter.emit(true);
    });
  }

  listAPC(){
    if(this.userService.user.role.name === 'user'){
      this.APCService.listProductForCompany(this.company._id).subscribe((res:any)=>{
        this.attributePC = res.products;
        console.log(res); 
      });

    }else{
      this.APCService.listAttributeProductCompany().subscribe((res:any)=>{
        this.attributePC = res.productCompany;
      });
    }
  }

  chargeList(){
    this.productService.listProduct().subscribe((res:any)=>{
        this.products = res.products;
    });

    this.companyService.listCompany().subscribe((res:any)=>{
      this.companies = res.companies;
    });
  }

  save(APC:AttributeProductCompany){
    
    if(APC.price == null || APC.company == null || APC.product == null){
      swal('Product Company Required','Price, Company and Attributo-Product','warning');
      return;
    };

    this.attributePC.forEach(element => {
    });

    this.APCService.save(APC);
    this.init();
    this.show = false;
    this.render();
  }

  update(APC:AttributeProductCompany){
    if(APC.price == null || APC.company == null || APC.product == null){
      swal('Product Company Required','Price, Company and Attributo-Product','warning');
      return;
    };

    if(APC._id == null){
      swal('contact technical service','Product Company Id is required','warning');
      return;
    };

    this.APCService.update(APC);
    this.init2();
    this.showup = false;
    this.render();
  }

  deleteById(id:string){
    if(id == null){
      swal('contact technical service','Product Company id is required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Product Company?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.APCService.deleteById(id);
        this.render();
      }
    });
  }

}