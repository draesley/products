import { Category } from './category';
export class Line{
    constructor(
        public _id:number,
        public name:string,
        public category:Category
    ){}
}