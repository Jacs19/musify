import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertAdd: string;
    public is_edit: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _albumService: AlbumService
    ){
        this.titulo = 'Crear nuevo álbum';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album("", "", 2019, "", "");
    }

    ngOnInit(){
        console.log("album-add.component.ts cargado...");
    }

    onSubmit(){
        this._route.params.forEach( (params: Params) => {
            let artist_id = params['artista'];
            this.album.artist = artist_id;

            this._albumService.addAlbum(this.token, this.album).subscribe(
                response => {                
                    if(!response['album']){
                        this.alertAdd = 'Error en el servidor';
                    }else{
                        this.alertAdd = 'El album se ha creado exitosamente';
                        this.album = response['album'];
                        
                        this._router.navigate(['/editar-album/' + response['album']['_id']]);
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if(errorMessage != null){                    
                      this.alertAdd = errorMessage.message;
                      console.log(errorMessage);
                    }
                }
            );

        });
    }

}