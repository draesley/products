import { Department } from './department';
export class City{
    constructor(
        public id:number,
        public code:number,
        public name:string,
        public departmentId:Department,
    ){

    }
}