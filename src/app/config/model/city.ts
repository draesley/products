import { Department } from './department';
export class City{
    constructor(
        public _id:number,
        public name:string,
        public department:Department,
    ){

    }
}