import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../../config/model/company';
import { CompanyService } from '../../pages/services/company.service';
import { LocationService } from '../../pages/services/location.service';
import { ContactService } from '../../pages/services/contact.service';
import { Location } from '../../config/model/location';
import { Contact } from '../../config/model/contact';
import { ImageService } from 'src/app/component/image/image.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {

  subscription:Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();
  companies:Company[] = [];
  model:Company;
  modelUp:Company;
  show:boolean = false;
  showup:boolean = false;
  locations:Location[] = [];
  contacts:Contact [] = [];

  constructor(private companyService:CompanyService,
              private locationService:LocationService,
              private contactService:ContactService,
              public imageService:ImageService) { }

  ngOnInit() {
    this.init();
    this.listCompanies();
    this.chargeList();
  }

  init(){
    this.model = {
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

  render(){
      this.subscription = this.companyService.observable.subscribe((res:any)=>{
        this.listCompanies();
        this.emitter.emit(true);
      });
  }

  showModal(id:string){
    this.imageService.showModal('company', id);
  }

  listCompanies(){
    this.companyService.listCompany().subscribe((res:any)=>{
      this.companies = res.companies;
    });
  }

  chargeList(){
    this.contactService.listContacts().subscribe((res:any)=>{
      this.contacts = res.contacts;
    });

    this.locationService.listLocation().subscribe((res:any)=>{
      this.locations = res.locations;
    });
  }

  save(company:Company){
    if(company.nit == "" || company.name == "" || company.adress == "" || company.contact == null || company.location == null){
      swal('Company Required','Nit, Name, Adress, Contact and Location','warning');
      return;
    };

    this.companyService.save(company);
    this.init();
    this.show = false;
    this.render();
  }

  update(company:Company){
    if(company.nit == "" || company.name == "" || company.adress == "" || company.contact == null || company.location == null){
      swal('Company Required','Nit, Name, Adress, Contact and Location','warning');
      return;
    };

    if(company._id == ""){
      swal('contact technical service','Company Id is required','warning');
      return;
    };

    this.companyService.update(company);
    this.init2();
    this.showup = false;
    this.render();
  }

  deleteById(id:string){
    if(id == null){
      swal('contact technical service','Company Id is required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Company?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.companyService.deleteById(id);
        this.render();
      }
    });
  }

}
