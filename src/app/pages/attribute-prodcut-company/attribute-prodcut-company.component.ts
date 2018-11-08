import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttributeProductCompany } from '../../config/model/attribute.product.ompany';
import { AttributeProduct } from '../../config/model/attributeproduct';
import { Company } from '../../config/model/company';
import { AttributeproductCompanyService } from '../../services/attributeproduct-company.service';
import { AttributeproductService } from '../../services/attributeproduct.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-attribute-prodcut-company',
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
  attributeP:AttributeProduct[] = [];
  companies:Company[] = [];
  show:boolean = false;
  showup:boolean = false;

  constructor(private APCService:AttributeproductCompanyService,
              private APService:AttributeproductService,
              private companyService:CompanyService) { }

  ngOnInit() {
    this.init();
    this.listAPC();
    this.chargeList();
  }

  init(){
    this.model = {
      id:null,
      price:null,
      companyId:null,
      attributeproductsId:null
    };
  }

  init2(){
    this.modelUp = {
      id:null,
      price:null,
      companyId:null,
      attributeproductsId:null
    };
  }

  render(){
    this.subscription = this.APCService.observable.subscribe(()=>{
      this.listAPC();
      this.emitter.emit(true);
    });
  }

  listAPC(){
    this.APCService.listAttributeProductCompany().subscribe((res:any)=>{
        this.attributePC = res;
    });
  }

  chargeList(){
    this.APService.listAttributeProduct().subscribe((res:any)=>{
        this.attributeP = res;
    });

    this.companyService.listCompany().subscribe((res:any)=>{
      this.companies = res;
    });
  }

  save(APC:AttributeProductCompany){
    if(APC.price == null || APC.companyId == null || APC.attributeproductsId == null){
      swal('Product Company Required','Price, Company and Attributo-Product','warning');
      return;
    };

    this.APCService.save(APC);
    this.init();
    this.show = false;
    this.render();
  }

  update(APC:AttributeProductCompany){
    if(APC.price == null || APC.companyId == null || APC.attributeproductsId == null){
      swal('Product Company Required','Price, Company and Attributo-Product','warning');
      return;
    };

    if(APC.id == null){
      swal('contact technical service','Product Company Id is required','warning');
      return;
    };

    this.APCService.update(APC);
    this.init2();
    this.showup = false;
    this.render();
  }

  deleteById(id:number){
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