import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Album } from "src/app/models/album";
import { AlbumLog } from "src/app/models/album-log";
import { JsonBin } from "src/app/models/json-bin";

export abstract class AbstractBinService {
    public abstract getAlbumList(): Observable<Array<Album>>;
    public abstract putAlbumList(): Observable<Array<Album>>;
    public abstract albumArray: any;

}