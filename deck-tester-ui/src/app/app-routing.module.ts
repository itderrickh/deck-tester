import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeckComponent } from './pages/deck/deck.component';

const routes: Routes = [
  { path: 'deck/:id', component: DeckComponent },
  { path: '', pathMatch: 'full', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
