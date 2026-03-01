import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoutiquesComponent } from './boutiques/boutiques.component';
import { BoutiqueDetailComponent } from './boutique-detail/boutique-detail.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  { path: '', component: BoutiquesComponent },
  { path: 'panier', component: PanierComponent },
  { path: ':id', component: BoutiqueDetailComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ClientRoutingModule {}
