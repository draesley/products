import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttributeProduct } from '../../config/model/attributeproduct';
import { Attribute } from '../../config/model/attribute';
import { Product } from '../../config/model/product';
import { AttributeproductService } from '../../services/attributeproduct.service';
import { AttributeService } from '../../services/attribute.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-attributeproduct',
  templateUrl: './attributeproduct.component.html',
})
export class AttributeproductComponent implements OnInit {

  subscription:Subscription;
  @Output()
  emitter = new EventEmitter<boolean>();
  model:AttributeProduct;
  modelUp:AttributeProduct;
  show:boolean = false;
  showup:boolean = false;
  attributes:Attribute[] = [];
  products:Product[] = [];
  attributeProducts:AttributeProduct[] = [];

  constructor(private attributeProductService:AttributeproductService,
              private attributeService:AttributeService,
              private productService:ProductService) { }

  ngOnInit() {
    this.init();
    this.listAtributeProducts();
    this.chargeList();
  }

  init(){
    this.model = {
      id:null,
      description:"",
      attributeId:null,
      productsId:null

    };
  }

  init2(){
    this.modelUp = {
      id:null,
      description:"",
      attributeId:null,
      productsId:null

    };
  }

  render(){
    this.subscription = this.attributeProductService.observable.subscribe(()=>{
        this.listAtributeProducts();
        this.emitter.emit(true);
    });
  }


  listAtributeProducts(){
    this.attributeProductService.listAttributeProduct().subscribe((res:any)=>{
      this.attributeProducts = res;
    });
  }

  chargeList(){
    this.attributeService.getlist().subscribe((res:any)=>{
      this.attributes = res;
    });

    this.productService.listProduct().subscribe((res:any)=>{
      this.products = res;
    });
  }

  save(attributePro:AttributeProduct){
    if(attributePro.description == "" || attributePro.attributeId == null || attributePro.productsId == null){
        swal('Attribute-Products Required','Description, Attribute and Product','warning');
        return;
    };

    this.attributeProductService.save(attributePro);
    this.init();
    this.show = false;
    this.render();
  }

  update(attributePro:AttributeProduct){
    if(attributePro.description == "" || attributePro.attributeId == null || attributePro.productsId == null){
        swal('Attribute-Products Required','Description, Attribute and Product','warning');
        return;
    };

    if(attributePro.id == null){
      swal('contact technical service','Attribute Product Id is required','warning');
      return;
    }

    this.attributeProductService.update(attributePro);
    this.init2();
    this.showup = false;
    this.render();
  }

  deleteById(id:number){
    if(id == null){
      swal('contact technical service','Attribute Product id is required','warning');
      return;
    }

    swal({
      title:'¿you are sure to delete this Attribute Product?',
      text:'',
      icon:'warning',
      dangerMode: true

    })
    .then(deletes =>{
      if(deletes){
        this.attributeProductService.deleteById(id);
        this.render();
      }
    });
  }
}