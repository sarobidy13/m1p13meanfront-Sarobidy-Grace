import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeLoyerComponent } from './liste-loyer/liste-loyer.component';

const routes: Routes = [
  { path: '', component: ListeLoyerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyerRoutingModule {}
