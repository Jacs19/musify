export class Song{
    //esto es lo mismo que realizar el paso de parametros con 'this'
    constructor(
        public number: number,
        public name: string,
        public duration: string,
        public file: string,
        public album: string
    ){}
}