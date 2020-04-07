import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertUpdate;

    constructor(
        private _userService: UserService
    ){
        this.titulo = 'Actualizar mis datos';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit(){        
        console.log('user-edit.component.ts... cargado');
    }

    onSubmit(){
        console.log(this.user);

        this._userService.updateUser(this.user).subscribe(
            response => {
                this.user = response['user'];

                if(!response['user']){
                    this.alertUpdate = "El usuario no se ha actualizado";
                }else{
                    this.user = response['user'];
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.alertUpdate = "El usuario se ha actualizado correctamente";
                }
            },
            error => {
                var errorMessage = <any>error;
                if(errorMessage != null){
                  this.alertUpdate = errorMessage.message;
                  console.log(errorMessage);
                }
              }
        );
    }

}