import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Song } from '../models/song';
import { SongService } from '../services/song.service';

@Component({
    selector: 'player',
    template: `
        <div class="album-image">
            <span *ngIf="song.album">
                <img id="play-image-album" src={{url + 'get-image-album/' + song.album.image}} />
            </span>
            
            <span *ngIf="!song.album">
                <img id="play-image-album" src="assets/images/default.jpg" />
            </span>
        </div>

        <div class="audio-file">
            <p>Reproduciendo</p>
            <span id="play-song-title">
                {{song.name}}
            </span>
            |
            <span id="play-song-artist">
                <span *ngIf="song.artist">
                    {{song.album.artist.name}}
                </span>
            </span>

            <audio controls id="player">
                <source id="mp3-source" src="{{url + 'get-file-song/' + song.file}}" type="audio/mpeg" />
                Tu navegador no es compatible con HTML5
            </audio>
        </div>
    `,
    providers: [UserService, SongService]
})

export class PlayerComponent implements OnInit{
    public url: string;
    public song: Song;

    constructor(){
        this.url = GLOBAL.url;
        this.song = new Song(1, "", "", "", "");
    }

    ngOnInit(){
        console.log("player.component.ts cargado...");
    }

}