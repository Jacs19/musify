import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.html',
    providers: [UserService, ArtistService, AlbumService]
})

export class ArtistDetailComponent implements OnInit{
    public artist: Artist;
    public albums: Album[];
    public identity;
    public token;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _albumService: AlbumService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;    
    }

    ngOnInit(){
        console.log("artist-detail.component.ts cargado...");
        //Llamar al metodo del api para sacar un artista en base a su id getArtist
        this.getArtist();
    }

    getArtist(){
        this._route.params.forEach( (params: Params) => {
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if(!response['artist']){
                        this._router.navigate(['/']);
                    }else{
                        this.artist = response['artist'];
                                                
                        //Sacar los albums del artista
                        this._albumService.getAlbums(this.token, this.artist['_id']).subscribe(
                            response => {
                                if(!response['albums']){
                                    this._router.navigate(['/']);
                                }else{
                                    this.albums = response['albums'];                                                               
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
                      //this.alertAdd = errorMessage.message;
                      console.log(errorMessage);
                    }
                }
            );
        });
    }

}