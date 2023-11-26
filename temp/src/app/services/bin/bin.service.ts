import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JsonBin } from 'src/app/models/json-bin';
import { AlbumLog } from 'src/app/models/album-log';
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BinService {

  constructor(public http: HttpClient) { }
  
  headers:HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Master-Key', environment.xmasterkey);

  public getAlbums() {

    return this.http.get<JsonBin<AlbumLog>>(environment.getAlbumLogEndpoint,{ 'headers': this.headers })
      .pipe(
        map(songLogs => {
        }
  }
  }
}
