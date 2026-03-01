import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeCategorieComponent } from './liste-categorie/liste-categorie.component';
import { FormCategorieComponent } from './form-categorie/form.categorie.component';

const routes: Routes = [
  { path: '', component: ListeCategorieComponent },
  { path: 'form', component: FormCategorieComponent },
  { path: 'form/:id', component: FormCategorieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieBoutiqueRoutingModule {}
