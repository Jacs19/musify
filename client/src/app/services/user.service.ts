import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{

    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    signup(user_to_login, gethash = null){
        if(gethash != null){
            user_to_login.gethash = gethash;
        }
        let json = JSON.stringify(user_to_login);
        let body = json;

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        //return this._http.post(this.url+'login', params, {headers: headers}).pipe(map(res => res));

        return this._http.post(this.url + "login", body, {
            headers: headers,
            responseType: 'json'
        });
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        
        if(identity != undefined){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        
        return this.identity;
    }

    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));
        
        if(token != undefined){
            this.token = this.token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    register(user_to_register){
        let body = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.post(this.url + "register", body, {
            headers: headers,
            responseType: 'json'
        });
    }

    update_user(user_to_update){
        let body = JSON.stringify(user_to_update);
        let headers = new HttpHeaders({
                        'Content-Type': 'application/json', 
                        'Authorization': this.getToken()
                    });

        return this._http.put(this.url + "update-user/" + user_to_update._id, body, {
            headers: headers,
            responseType: 'json'
        });
    }

}