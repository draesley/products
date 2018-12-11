import { Attribute } from './attribute';
import { Product } from './product';
export class AttributeProduct{
    constructor(
        public _id:number,
        public description:string,
        public attribute:Attribute,
        public product:Product, 
    ){}
}