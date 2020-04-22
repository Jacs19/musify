import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [UserService, AlbumService]
})

export class AlbumDetailComponent implements OnInit{
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;    
    }

    ngOnInit(){
        console.log("album-detail.component.ts cargado...");
        //Llamar al metodo del api para sacar un artista en base a su id getArtist
        this.getAlbum();
    }

    getAlbum(){
        this._route.params.forEach( (params: Params) => {
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response => {                
                    if(!response['album']){
                        this._router.navigate(['/']);
                    }else{                        
                        this.album = response['album'];
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if(errorMessage != null){                                          
                      console.log(errorMessage);
                    }
                }
            );
        });
    }    

    onDeleteConfirm(id){
        this.confirmado = id;
    }

    onCancelAlbum(){
        this.confirmado = null;
    }

    onDeleteAlbum(id){
        this._albumService.deleteAlbum(this.token, id).subscribe(
            response => {                
                if(!response['albumRemoved']){
                    alert("Error en el servidor");
                }else{                        
                    this.getAlbum();
                }
            },
            error => {
                var errorMessage = <any>error;
                if(errorMessage != null){                                          
                  console.log(errorMessage);
                }
            }
        );
    }

}