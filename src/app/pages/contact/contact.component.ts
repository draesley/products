import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, concat } from 'rxjs';
import { Contact } from '../../config/model/contact';
import { ContactService } from '../../pages/services/contact.service';
import { LocationService } from '../../pages/services/location.service';
import { UserService } from '../../pages/services/user.service';
import { Location } from '../../config/model/location';
import { User } from '../../config/model/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {

  subscription = new Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();
  model:Contact;
  modelUp:Contact;
  show:boolean = false;
  showup:boolean = false;
  contacts:Contact[] = [];
  locations:Location[] = [];
  users:User[] = [];

  constructor(private contactService:ContactService,
              private locationService:LocationService,
              private userService:UserService) { }

  ngOnInit() {

    this.init();
    this.listContact();
    this.chargeList();
  }

  init(){
    this.model = {
      id:null,
      code:null,
      name:"",
      adress:"",
      lastname:"",
      email:"",
      movil:null,
      phon:null,
      locationId:null,
      userId:null
    }
  }

  init2(){
    this.modelUp = {
      id:null,
      code:null,
      name:"",
      adress:"",
      lastname:"",
      email:"",
      movil:null,
      phon:null,
      locationId:null,
      userId:null
    }
  }

  render(){
    this.subscription = this.contactService.observable.subscribe(()=>{
        this.listContact();
        this.emitter.emit(true);
    });
  }

  chargeList(){
    this.locationService.listLocation().subscribe((res:any)=>{
      this.locations = res;
    });

    this.userService.listUser().subscribe((res:any)=>{
      this.users = res;
    });
  }

  listContact(){
    this.contactService.listContacts().subscribe((res:any)=>{
        this.contacts = res;
    });
  }

  save(contact:Contact){
    if(contact.code == null || contact.name == "" || contact.lastname == "" || contact.locationId == null || contact.userId == null){
        swal('Contact Required','Code, Name, Last-name, Location and User','warning');
        return;
    }

    this.contactService.save(contact);
    this.init();
    this.show = false;
    this.render();
  }

  update(contact:Contact){
    if(contact.code == null || contact.name == "" || contact.lastname == "" || contact.locationId == null || contact.userId == null){
      swal('Contact Required','Code, Name, Last-name, Location and User','warning');
      return;
    }

    if(contact.id == null){
      swal('contact technical service','Contatc Id is required','warning');
      return;
    }

    this.contactService.update(contact);
    this.init2();
    this.showup = false;
    this.render();
  }

  deleteById(id:number){
    if(id == null){
      swal('contact technical service','Contact id is required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Contact?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.contactService.deleteById(id);
        this.render();
      }
    });
  }
}
