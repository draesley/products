import { Company } from './company';
import { AttributeProduct } from './attributeproduct';
export class AttributeProductCompany{
    constructor(
        public id:number,
        public price:number,
        public companyId:Company,
        public attributeproductsId:AttributeProduct,
    ){}
}