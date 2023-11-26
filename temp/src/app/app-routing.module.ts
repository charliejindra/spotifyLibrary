import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoiceMenuComponent } from './components/choice-menu/choice-menu.component';
import { TrackModeComponent } from './components/track-mode/track-mode.component';


const routes: Routes = [
  { path: '', component: ChoiceMenuComponent},
  { path: 'trackmode', component: TrackModeComponent},
  { path: 'home', component: ChoiceMenuComponent },
  { path: '**', component: ChoiceMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
