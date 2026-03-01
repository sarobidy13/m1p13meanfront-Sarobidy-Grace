import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { FormArticleComponent } from './form-article/form-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { EntreeStockComponent } from './entree-stock/entree-stock.component';

const routes: Routes = [
  { path: '', component: ListeArticleComponent },
  { path: 'form', component: FormArticleComponent },
  { path: 'form/:id', component: FormArticleComponent },
  { path: 'detail/:id', component: DetailArticleComponent },
  { path: 'entree/:id', component: EntreeStockComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ArticleRoutingModule {}
