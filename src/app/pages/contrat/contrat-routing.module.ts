import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeContratComponent } from './liste-contrat/liste-contrat.component';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { DetailContratComponent } from './detail-contrat/detail-contrat.component';

const routes: Routes = [
  { path: '', component: ListeContratComponent },
  { path: 'form', component: FormContratComponent },
  { path: 'form/:id', component: FormContratComponent },
  { path: 'detail/:id', component: DetailContratComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratRoutingModule {}
