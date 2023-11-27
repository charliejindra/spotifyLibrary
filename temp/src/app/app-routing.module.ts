import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoiceMenuComponent } from './components/choice-menu/choice-menu.component';
import { TrackModeComponent } from './components/track-mode/track-mode.component';
import { ViewModeComponent } from './components/view-mode/view-mode.component';


const routes: Routes = [
  { path: '', component: ViewModeComponent},
  { path: 'view', component: ViewModeComponent},
  { path: 'home', component: ChoiceMenuComponent },
  { path: '**', component: ViewModeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
