import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule } from '@nebular/theme';
import { ArticleRoutingModule } from './article-routing.module';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { FormArticleComponent } from './form-article/form-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { EntreeStockComponent } from './entree-stock/entree-stock.component';

@NgModule({
  declarations: [ListeArticleComponent, FormArticleComponent, DetailArticleComponent, EntreeStockComponent],
  imports: [CommonModule, FormsModule, NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule, ArticleRoutingModule],
})
export class ArticleModule {}
