export class User{
    //esto es lo mismo que realizar el paso de parametros con 'this'
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ){}
}