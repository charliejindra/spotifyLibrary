import { Component, OnInit } from '@angular/core';
import { AbstractSoloService } from 'src/app/services/solo-view/abstract.solo-view.service';

@Component({
  selector: 'app-solo-view',
  templateUrl: './solo-view.component.html',
  styleUrls: ['./solo-view.component.css']
})
export class SoloViewComponent implements OnInit {

  constructor(public soloService: AbstractSoloService) { }

  public title: string;
  public imgUrl: string;

  ngOnInit(): void {
  }

}
