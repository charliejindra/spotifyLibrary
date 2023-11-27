import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-tile',
  templateUrl: './album-tile.component.html',
  styleUrls: ['./album-tile.component.css']
})
export class AlbumTileComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  @Input() imgUrl: string;
  @Input() size: string;

  ngOnInit(): void {
  }

  public goToSoloView() {
    
  }

}
