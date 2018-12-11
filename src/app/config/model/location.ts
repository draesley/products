import { City } from "./city";
import { TypeLocation } from "./type.location";
import { Commune } from "./commune";

export class Location{
    constructor(
        public _id:number,
        public name:string,
        public city:City,
        public typeLocation:TypeLocation,
        public commune:Commune
    ){}
}