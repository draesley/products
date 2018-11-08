import { City } from "./city";
import { TypeLocation } from "./type.location";
import { Commune } from "./commune";

export class Location{
    constructor(
        public id:number,
        public code:number,
        public name:string,
        public cityId:City,
        public typelocationId:TypeLocation,
        public communeId:Commune
    ){}
}