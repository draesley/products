import { Category } from './category';
export class Product{
    constructor(
        public  id:number,
        public code:string,
        public name:string,
        public img:string,
        public detail:string,
        public categoryId:Category
    ){}
}

