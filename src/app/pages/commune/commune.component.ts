import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Commune } from '../../config/model/commune';
import { Subscription } from 'rxjs';
import { CommuneService } from '../../pages/services/commune.service';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styles: []
})
export class CommuneComponent implements OnInit {

  show:boolean = false;
  communes:Commune[] = [];
  model:Commune;
  modelUp:Commune;
  @Output()
  emitter = new EventEmitter<boolean>();
  subscription:Subscription;

  constructor(private communeService:CommuneService) { }

  ngOnInit() {
    this.listCommunes();
    this.init();
  }

  render(){
    this. subscription = this.communeService.observable.subscribe(()=>{
      this.listCommunes();
      this.emitter.emit(true);
    });
  }

  init(){
    this.model ={
      id:null,
      name:""
    }
  }

  init2(){
    this.modelUp ={
      id:null,
      name:""
    }
  }

  showCard(){
    this.show = true;
  }

  listCommunes(){
    this.communeService.listCommunes().subscribe((res:any)=>{
      this.communes = res;
    });
  }

  save(commune:Commune){
    if(commune.name == ""){
      swal('Commune Name is required','','warning');
      return;
    }

    this.communeService.save(commune);
    this.init();
    this.render();
  }

  update(commune:Commune){
    if(commune.name == ""){
      swal('Commune Name is required','','warning');
      return;
    }

    if(commune.id == null){
      swal('Commune id is required','contact technical service','warning');
      return;
    }

    this.communeService.update(commune);
    this.show = false;
    this.init2();
    this.render();
  }

  deleteById(id:number){
    if(id == null){
      swal('Commune id is required','contact technical service','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Commune?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.communeService.deleteById(id);
        this.render();
      }
    });
  }
}
