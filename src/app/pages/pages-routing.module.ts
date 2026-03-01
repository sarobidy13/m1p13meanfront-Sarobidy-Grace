import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // ADMIN seulement
      { path: 'boutique', canActivate: [RoleGuard], data: { roles: [1] }, loadChildren: () => import('./boutique/boutique.module').then(m => m.BoutiqueModule) },
      { path: 'categorie-boutique', canActivate: [RoleGuard], data: { roles: [1] }, loadChildren: () => import('./categorie-boutique/categorie-boutique.module').then(m => m.CategorieBoutiqueModule) },
      { path: 'contrat', canActivate: [RoleGuard], data: { roles: [1] }, loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule) },
      { path: 'loyer', canActivate: [RoleGuard], data: { roles: [1] }, loadChildren: () => import('./loyer/loyer.module').then(m => m.LoyerModule) },
      // GERANT seulement
      { path: 'article', canActivate: [RoleGuard], data: { roles: [2] }, loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
      { path: 'vente', canActivate: [RoleGuard], data: { roles: [2] }, loadChildren: () => import('./vente/vente.module').then(m => m.VenteModule) },
      { path: 'stock', canActivate: [RoleGuard], data: { roles: [2] }, loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) },

      { path: '', redirectTo: 'boutique', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
