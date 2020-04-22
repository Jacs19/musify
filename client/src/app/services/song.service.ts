import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from './global';
import { Song } from '../models/song';

@Injectable()
export class SongService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addSong(token, song: Song){
        let params = JSON.stringify(song);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'song', params, {
            headers: headers,
            responseType: 'json'
        });
    }

    getSong(token, id){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(this.url + 'song/' + id, {
            headers: headers,
            responseType: 'json'
        });
    }

    editSong(token, id: string, song: Song){
        let params = JSON.stringify(song);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'song/' + id, params, {
            headers: headers,
            responseType: 'json'
        });
    }

    deleteSong(token, id: string){ 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.delete(this.url + 'song/' + id, {
            headers: headers,
            responseType: 'json'
        });
    }

    getSongs(token, albumId = null){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        if(albumId == null){
            return this._http.get(this.url + 'songs', {
                headers: headers,
                responseType: 'json'
            });
        }else{
            return this._http.get(this.url + 'songs/' + albumId, {
                headers: headers,
                responseType: 'json'
            });
        }        
    }

}