import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';

@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]
})

export class ArtistEditComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertAdd: string;
    public is_edit: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ){
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist("", "", "");
        this.is_edit = true;
    }

    ngOnInit(){
        console.log("artist-add.component.ts cargado...");
        //Llamar al metodo del api para sacar un artista en base a su id getArtist
        this.getArtist();
    }

    getArtist(){
        this._route.params.forEach( (params: Params) => {
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(
                response => {

                },
                error => {

                }
            );
        });
    }

    onSubmit(){
        this._artistService.addArtist(this.token, this.artist).subscribe(
            response => {                
                if(!response['artist']){
                    this.alertAdd = 'Error en el servidor';
                }else{
                    this.alertAdd = 'El artista se ha creado exitosamente';
                    this.artist = response['artist'];
                    //this._router.navigate(['/editar-artista'], response.artista._id);
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
    }

}