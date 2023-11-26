import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackModeComponent } from './components/track-mode/track-mode.component';
import { ChoiceMenuComponent } from './components/choice-menu/choice-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackModeComponent,
    ChoiceMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
