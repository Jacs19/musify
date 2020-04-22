import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [UserService, AlbumService, SongService]
})

export class AlbumDetailComponent implements OnInit{    
    public album: Album;
    public songs: Song[];
    public identity;
    public token;
    public url: string;
    public confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _songService: SongService
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

                        //Sacar las canciones
                        this._songService.getSongs(this.token, this.album['_id']).subscribe(
                            response => {                
                                if(!response['songs']){
                                    this._router.navigate(['/']);
                                }else{                        
                                    this.songs = response['songs'];
                                   
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

    onCancelSong(){
        this.confirmado = null;
    }

    onDeleteSong(id){
        this._songService.deleteSong(this.token, id).subscribe(
            response => {                
                if(!response['song']){
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