import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeBoutiqueComponent } from './liste-boutique/liste-boutique.component';
import { FormBoutiqueComponent } from './form-boutique/form-boutique.component';
import { DetailBoutiqueComponent } from './details-boutique/detail-boutique.component';
const routes: Routes = [
  { path: '', component: ListeBoutiqueComponent },
  { path: 'form', component: FormBoutiqueComponent },
  { path: 'form/:id', component: FormBoutiqueComponent },
  { path: 'detail/:id', component: DetailBoutiqueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoutiqueRoutingModule {}
