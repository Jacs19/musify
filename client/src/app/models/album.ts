export class Album{
    //esto es lo mismo que realizar el paso de parametros con 'this'
    constructor(
        public title: string,
        public description: string,
        public year: number,
        public image: string,
        public artist: string
    ){}
}