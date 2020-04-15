import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './services/user.service';
import { User } from './models/user';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  providers: [UserService]
})

export class AppComponent implements OnInit {
  title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public alertSign;
  public alertRegister;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit(){
    console.log(this.user);

    //se obtienen los datos del usuario
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response['user'];
        this.identity = identity;
        
        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado");
        }else{
          //se crea sesion en local storage, para guardar los datos del usuario
          localStorage.setItem('identity', JSON.stringify(identity));

          //se obtiene el token del usuario, para poder agregarlo a cada peticion
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response['token'];
              this.token = token;

              if(this.token <= 0){
                alert("El token no se ha generado correctamente");
              }else{
                localStorage.setItem('token', token);
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');                
              }
            },
            error => {
              var errorMessage = <any>error;
              if(errorMessage != null){
                //var body = JSON.parse(error._body);
                this.alertSign = errorMessage.error.mensaje;
                console.log(errorMessage);
              }
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          //var body = JSON.parse(error._body);
          this.alertSign = errorMessage.error.mensaje;
          console.log(errorMessage);
        }
      }
    );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    //elimina por completo los datos guardados en el local storage
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }
  
  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response['user'];
        this.user_register = user;

        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha realizado correctamente, identificate con ' + this.user_register.email;
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.alertRegister = errorMessage.error.mensaje;
          console.log(errorMessage);
        }
      }
    );
  }

}
