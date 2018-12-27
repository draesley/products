import { Company } from "./company";
import { Service } from "./service";

export class ServiceCompany{
    constructor(
        public _id:number,
        public description:string,
        public company:Company,
        public service:Service
    ){

    }
}