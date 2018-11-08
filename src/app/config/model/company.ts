import { Contact } from "./contact";
import { Location } from './location';

export class Company{
    constructor(
        public id:number,
        public nit:string,
        public name:string,
        public adress:string,
        public phon1:number,
        public movil:number,
        public img:string,
        public email:string,
        public contactId:Contact,
        public locationId:Location,
    ){}
}