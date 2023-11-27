import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackModeComponent } from './components/track-mode/track-mode.component';
import { ChoiceMenuComponent } from './components/choice-menu/choice-menu.component';
import { AlbumTileComponent } from './components/album-tile/album-tile.component';
import { ViewModeComponent } from './components/view-mode/view-mode.component';
import { AbstractBinService } from './services/bin/abstract.bin.service';
import { BinService } from './services/bin/bin.service';
import { HttpClientModule } from '@angular/common/http';
import { SoloViewComponent } from './components/solo-view/solo-view.component';
import { AbstractSoloService } from './services/solo-view/abstract.solo-view.service';
import { SoloViewService } from './services/solo-view/solo-view.service';

@NgModule({
  declarations: [
    AppComponent,
    TrackModeComponent,
    ChoiceMenuComponent,
    AlbumTileComponent,
    ViewModeComponent,
    SoloViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: AbstractSoloService, useClass: SoloViewService},
    {provide: AbstractBinService, useClass: BinService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
