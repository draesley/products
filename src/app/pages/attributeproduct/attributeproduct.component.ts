import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttributeProduct } from '../../config/model/attributeproduct';
import { Attribute } from '../../config/model/attribute';
import { Product } from '../../config/model/product';
import { AttributeproductService } from '../../pages/services/attributeproduct.service';
import { AttributeService } from '../../pages/services/attribute.service';
import { ProductService } from '../../pages/services/product.service';

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
      _id:null,
      description:"",
      attribute:null,
      product:null

    };
  }

  init2(){
    this.modelUp = {
      _id:null,
      description:"",
      attribute:null,
      product:null

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
      this.attributeProducts = res.attributeProduct;

    });
  }

  chargeList(){
    this.attributeService.getlist().subscribe((res:any)=>{
      this.attributes = res.attributes;
    });

    this.productService.listProduct().subscribe((res:any)=>{
      this.products = res.products;
    });
  }

  save(attributePro:AttributeProduct){
    if(attributePro.description == "" || attributePro.attribute == null || attributePro.product == null){
        swal('Attribute-Products Required','Description, Attribute and Product','warning');
        return;
    };

    this.attributeProductService.save(attributePro);
    this.init();
    this.show = false;
    this.render();
  }

  update(attributePro:AttributeProduct){
    if(attributePro.description == "" || attributePro.attribute == null || attributePro.product == null){
        swal('Attribute-Products Required','Description, Attribute and Product','warning');
        return;
    };

    if(attributePro._id == null){
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