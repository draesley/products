import { Contact } from "./contact";
import { Location } from './location';

export class Company{
    constructor(
        public _id:string,
        public nit:string,
        public name:string,
        public adress:string,
        public phon:number,
        public movil:number,
        public img:string,
        public email:string,
        public contact:Contact,
        public location:Location,
    ){}
}