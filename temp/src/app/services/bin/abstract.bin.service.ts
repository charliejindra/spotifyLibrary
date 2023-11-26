import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

export abstract class AbstractListeningStatsService {
    public abstract getAlbumList()
    public httpClient: HttpClient;
}