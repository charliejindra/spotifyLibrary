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

  ngOnInit(): void {
  this.binService.getAlbumList().subscribe(array => {
    this.albumArray = array.record;
    this.retrievedAlbums = true;
    })
  }

}
