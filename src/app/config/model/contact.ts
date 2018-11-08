import { User } from "./user";
import { Location } from "./location";

export class Contact{
    constructor(
        public id:number,
        public code:number,
        public name:string,
        public lastname:string,
        public adress:string,
        public phon:number,
        public movil:number,
        public email:string,
        public userId:User,
        public locationId:Location,
    ){

    }
}