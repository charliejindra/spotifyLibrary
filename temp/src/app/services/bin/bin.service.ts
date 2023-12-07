import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JsonBin } from 'src/app/models/json-bin';
import { AlbumLog } from 'src/app/models/album-log';
import { Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import { AbstractBinService } from './abstract.bin.service';
import { Album } from 'src/app/models/album';

@Injectable({
  providedIn: 'root'
})
export class BinService implements AbstractBinService {
  headers:HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Master-Key', environment.xmasterkey);

  constructor(public http: HttpClient) { 
    
  }
  
  public albumArray: Array<Album>;

  public getAlbumList() : Observable<Array<Album>>{

    return this.http.get<JsonBin<Album>>(environment.getAlbumLogEndpoint,{ 'headers': this.headers })
      .pipe(
        map(songLogs => {
          this.albumArray = songLogs.record;
          return songLogs.record;
        })
      )
  }

  public putAlbumList() : Observable<Array<Album>> {

    return this.http.put<Album[]>(environment.getAlbumLogEndpoint, this.albumArray, { 'headers': this.headers });
  }

}

// NEXT TIME:
// add put method for updating the bin with the new albumArray