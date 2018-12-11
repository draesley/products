import { Role } from "./role";

export class User{
    constructor(
        
        public name:string,
        public email:string,
        public password:string,
        public img?:string,
        public google?:boolean,
        public role?:Role,
        public _id?:string
    ){}
}