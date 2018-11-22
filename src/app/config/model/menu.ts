export class Menu{

    constructor(
        public id:number,
        public title:string,
        public icon:String,
        public url:String,
        public menusId:Menu
    ){}
}