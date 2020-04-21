import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';
import { UploadService } from '../services/upload.service';

@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [UserService, AlbumService, UploadService]
})

export class AlbumEditComponent implements OnInit{
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
        private _albumService: AlbumService,
        private _uploadService: UploadService
    ){
        this.titulo = 'Editar álbum';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album("", "", 2019, "", "");
        this.is_edit = true;
    }

    ngOnInit(){
        console.log("album-edit.component.ts cargado...");

        //Conseguir el album
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
                        console.log(this.album);                  
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

    onSubmit(){
        this._route.params.forEach( (params: Params) => {
            let id = params['id'];            

            this._albumService.editAlbum(this.token, id, this.album).subscribe(
                response => {                
                    if(!response['album']){
                        this.alertAdd = 'Error en el servidor';
                    }else{
                        this.alertAdd = 'El album se ha actualizado exitosamente';
                        
                        if(!this.filesToUpload){
                            //Redirigir
                        }else{
                            //Subir la imagen de artista
                        this._uploadService.makeFileRequest(this.url + 'upload-image-album/' + id,
                                                            [],
                                                            this.filesToUpload,
                                                            this.token,
                                                            'image')
                            .then( (result) => {
                                    this._router.navigate(['/artista', this.album.artist['_id']]);
                                },
                                (error) => {
                                    console.log(error);
                                });
                        }                        
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

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}