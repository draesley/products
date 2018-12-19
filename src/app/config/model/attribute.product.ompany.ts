import { Company } from './company';
import { Product } from './product';
export class AttributeProductCompany{
    constructor(
        public _id:string,
        public secondprice:number,
        public price:number,
        public company:Company,
        public product:Product,
    ){}
}