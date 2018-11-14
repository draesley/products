import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from '../../pages/services/location.service';
import { Location } from '../../config/model/location';
import { CityService } from '../../pages/services/city.service';
import { TypeLocationService } from '../../pages/services/type-location.service';
import { CommuneService } from '../../pages/services/commune.service';
import { City } from '../../config/model/city';
import { TypeLocation } from '../../config/model/type.location';
import { Commune } from '../../config/model/commune';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {

  subscription = new Subscription;
  @Output()
  emitter = new  EventEmitter<boolean>();
  model:Location;
  modelUp:Location;
  locations:Location[] = [];
  show:boolean = false;
  showup:boolean = false;
  cities:City[] = [];
  typeLocations:TypeLocation[] = [];
  commnunes:Commune[] = [];


  constructor(private locationService:LocationService,
              private cityService:CityService,
              private typeLocationService:TypeLocationService,
              private communeServcie:CommuneService) { }

  ngOnInit() {
    this.init();
    this.listLocations();
    this.chargelist();
  }

  init(){
    this.model = {
      id:null,
      code:null,
      name:"",
      cityId:null,
      typelocationId:null,
      communeId:null
    }
  }

  init2(){
    this.modelUp = {
      id:null,
      code:null,
      name:"",
      cityId:null,
      typelocationId:null,
      communeId:null
    }
  }

  render(){
    this.subscription = this.locationService.observable.subscribe(()=>{
        this.listLocations();
        this.emitter.emit(true);
    });
  }

  showCard(){
    this.show = true;
  }

  listLocations(){
    this.locationService.listLocation().subscribe((res:any)=>{
       this.locations = res; 
    });
  }

  chargelist(){
    this.cityService.listCity().subscribe((res:any)=>{
      this.cities = res;
    });

    this.typeLocationService.listTypeLocation().subscribe((res:any)=>{
      this.typeLocations = res;
    });

    this.communeServcie.listCommunes().subscribe((res:any)=>{
      this.commnunes = res;
    });
  }

  save(location:Location){
    if(location.code == null || location.name == "" || location.cityId == null || location.communeId == null || location.typelocationId == null){
        swal('Location Required','Name, Code, City, Type Location and Commune','warning');
        return;
    };

    this.locationService.save(location);
    this.init();
    this.show = false;
    this.render();
  }

  update(location:Location){
    if(location.code == null || location.name == "" || location.cityId == null || location.communeId == null || location.typelocationId == null){
        swal('Location Required','Name, Code, City, Type Location and Commune','warning');
        return;
    };

    this.locationService.update(location);
    this.init2();
    this.showup = false;
    this.render();
  }

  deleteById(id:number){
    if(id == null){
      swal('contact technical service','Location Id is Required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Location?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.locationService.deleteById(id);
        this.render();
      }
    });
  }
}