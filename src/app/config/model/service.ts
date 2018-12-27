import { Company } from "./company";
import { Subline } from "./subline";

export class Service{
    constructor(
        public _id:string,
        public name:string,
        public description:string,
        public img:string,
        public subline:Subline
    ){}
}