import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BinService } from 'src/app/services/bin/bin.service';
import { AbstractSoloService } from 'src/app/services/solo-view/abstract.solo-view.service';

@Component({
  selector: 'app-solo-view',
  templateUrl: './solo-view.component.html',
  styleUrls: ['./solo-view.component.css']
})
export class SoloViewComponent implements OnInit {

  constructor(public soloService: AbstractSoloService, public router: Router) { }

  public title: string;
  public imgUrl: string;
  public modify: boolean;
  public inspect: boolean = false;

  ngOnInit(): void {
  }

  public modifyMode() {
    this.modify = !this.modify;
  }

  public inspectMode() {
    this.inspect = !this.inspect;
  }

}
