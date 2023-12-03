import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { AbstractBinService } from 'src/app/services/bin/abstract.bin.service';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css']
})
export class ViewModeComponent implements OnInit {

  constructor(public binService: AbstractBinService) { }

  public albumArray: any;

  public retrievedAlbums: boolean = false;

  public get size(): string {
    let temp = 500 - (Math.log(this.albumArray.length) * 75);
    return temp + 'px';
  }

  ngOnInit(): void {
    if(!this.binService.albumArray){
      this.binService.getAlbumList().subscribe(array => {
        this.albumArray = array.record;
        this.retrievedAlbums = true;
        })
    } else {
      this.retrievedAlbums = true;
      this.albumArray = this.binService.albumArray.record;
    }
  
  }

}
