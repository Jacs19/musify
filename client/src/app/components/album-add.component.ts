import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';
import { Album } from '../models/album';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [UserService, ArtistService]
})

export class AlbumAddComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertAdd: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ){
        this.titulo = 'Crear nuevo álbum';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album("", "", 2019, "", "")  
    }

    ngOnInit(){
        console.log("album-add.component.ts cargado...");
    }

    onSubmit(){
        this._route.params.forEach( (params: Params) => {
            let artist_id = params['artista'];
            this.album.artist = artist_id;
        } );
        console.log(this.album);
    }

}