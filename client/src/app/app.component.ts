import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  providers: [UserService]
})

export class AppComponent implements OnInit {
  title = 'MUSIFY';
  public user: User;
  public identity;
  public token;
  public errorMessage;

  constructor(
    private _userService: UserService
  ){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){
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

                console.log(token);
                console.log(identity);
              }
            },
            error => {
              var errorMessage = <any>error;
              if(errorMessage != null){
                //var body = JSON.parse(error._body);
                this.errorMessage = errorMessage.error.mensaje;
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
          this.errorMessage = errorMessage.error.mensaje;
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
  }

}
