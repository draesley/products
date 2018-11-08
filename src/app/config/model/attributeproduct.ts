import { Attribute } from './attribute';
import { Product } from './product';
export class AttributeProduct{
    constructor(
        public id:number,
        public description:string,
        public attributeId:Attribute,
        public productsId:Product, 
    ){}
}