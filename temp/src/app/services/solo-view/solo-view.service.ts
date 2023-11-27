import { Injectable } from '@angular/core';
import { AbstractSoloService } from './abstract.solo-view.service';

@Injectable({
  providedIn: 'root'
})
export class SoloViewService implements AbstractSoloService {

  constructor() { }

  public title: string;
  public img_url: string;
}
