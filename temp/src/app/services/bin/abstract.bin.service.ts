import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { AlbumLog } from "src/app/models/album-log";
import { JsonBin } from "src/app/models/json-bin";

export abstract class AbstractBinService {
    public abstract getAlbumList(): Observable<JsonBin<AlbumLog>>;
}