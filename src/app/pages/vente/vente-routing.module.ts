import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeVenteComponent } from './liste-vente/liste-vente.component';
import { FormVenteComponent } from './form-vente/form-vente.component';
import { DetailVenteComponent } from './detail-vente/detail-vente.component';

const routes: Routes = [
  { path: '', component: ListeVenteComponent },
  { path: 'form', component: FormVenteComponent },
  { path: 'detail/:id', component: DetailVenteComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class VenteRoutingModule {}
