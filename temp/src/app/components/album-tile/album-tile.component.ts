import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractSoloService } from 'src/app/services/solo-view/abstract.solo-view.service';

@Component({
  selector: 'app-album-tile',
  templateUrl: './album-tile.component.html',
  styleUrls: ['./album-tile.component.css']
})
export class AlbumTileComponent implements OnInit {

  constructor(public router: Router, public soloview: AbstractSoloService) { }

  @Input() title: string;
  @Input() imgUrl: string;
  @Input() size: string;
  @Input() artist: string;
  @Input() timestamp: string;

  ngOnInit(): void {
  }

  public goToSoloView() {
    this.soloview.title = this.title;
    this.soloview.img_url = this.imgUrl;
    this.soloview.artist = this.artist;
    this.soloview.firstListen= this.timestamp;
    this.router.navigateByUrl('/solo');
  }

}