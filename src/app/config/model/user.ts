import { Role } from "./role";

export class User{
    constructor(
        public id:number,
        public name:string,
        public img:string,
        public password:string,
        public roleId:Role,
    ){}
}