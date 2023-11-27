import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoiceMenuComponent } from './components/choice-menu/choice-menu.component';
import { SoloViewComponent } from './components/solo-view/solo-view.component';
import { ViewModeComponent } from './components/view-mode/view-mode.component';


const routes: Routes = [
  { path: '', component: ViewModeComponent},
  { path: 'solo', component: SoloViewComponent},
  { path: 'view', component: ViewModeComponent},
  { path: 'home', component: ChoiceMenuComponent },
  { path: '**', component: ViewModeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
