import { Injectable } from '@angular/core';
import { AbstractBinService } from '../bin/abstract.bin.service';
import { AbstractSoloService } from './abstract.solo-view.service';

@Injectable({
  providedIn: 'root'
})
export class SoloViewService implements AbstractSoloService {

  constructor(public bin: AbstractBinService) { }

  public title: string;
  public img_url: string;
  public artist: string;
  public timestamp: string;
  public firstListen: string;
  public id: string;

  public deleteAlbum() {
    this.bin.albumArray = this.bin.albumArray.filter(el => el.id != this.id);
    alert('deleted');
    this.bin.putAlbumList().subscribe(()=> alert('askdjlfd'))

  }
}
