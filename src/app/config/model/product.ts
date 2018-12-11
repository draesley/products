import { Subline } from './subline';
export class Product{
    constructor(
        public  _id:number,
        public code:string,
        public name:string,
        public img:string,
        public detail:string,
        public subline:Subline
    ){}
}

