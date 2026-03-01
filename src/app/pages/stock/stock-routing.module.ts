import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockBoutiqueComponent } from './stock-boutique/stock-boutique.component';

const routes: Routes = [
  { path: '', component: StockBoutiqueComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class StockRoutingModule {}
