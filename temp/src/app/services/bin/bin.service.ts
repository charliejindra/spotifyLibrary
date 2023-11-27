import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JsonBin } from 'src/app/models/json-bin';
import { AlbumLog } from 'src/app/models/album-log';
import { Observable} from "rxjs";
import {map} from "rxjs/operators";
import { AbstractBinService } from './abstract.bin.service';

@Injectable({
  providedIn: 'root'
})
export class BinService implements AbstractBinService {
  headers:HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Master-Key', environment.xmasterkey);

  constructor(public http: HttpClient) { 
    
  }
  
  

  public getAlbumList() : Observable<JsonBin<AlbumLog>>{

    return this.http.get<JsonBin<AlbumLog>>(environment.getAlbumLogEndpoint,{ 'headers': this.headers })
      .pipe(
        map(songLogs => {
          return songLogs;
        })
      )
  }

}