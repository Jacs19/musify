import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Song } from '../models/song';
import { SongService } from '../services/song.service';

@Component({
    selector: 'song-add',
    templateUrl: '../views/song-add.html',
    providers: [UserService, SongService]
})

export class SongAddComponent implements OnInit{
    public titulo: string;
    public song: Song;
    public identity;
    public token;
    public url: string;
    public alertAdd: string;
    public is_edit: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService
    ){
        this.titulo = 'Crear nueva canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.song = new Song(1, "", "", "", "");        
    }

    ngOnInit(){
        console.log("song-add.component.ts cargado...");
    }

    onSubmit(){
        this._route.params.forEach( (params: Params) => {
            let album_id = params['id'];
            this.song.album = album_id;

            this._songService.addSong(this.token, this.song).subscribe(
                response => {                
                    if(!response['songStored']){
                        this.alertAdd = 'Error en el servidor';
                    }else{
                        this.alertAdd = 'La canción se ha creado exitosamente';
                        this.song = response['songStored'];
                        
                        this._router.navigate(['/editar-cancion/' + response['song']['_id']]);
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

    fileChangeEvent(fileInput: any){
        //this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}