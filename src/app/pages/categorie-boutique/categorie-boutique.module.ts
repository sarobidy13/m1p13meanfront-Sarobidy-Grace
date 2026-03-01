import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbAlertModule,
  NbSpinnerModule,
  NbBadgeModule,
} from '@nebular/theme';
import { CategorieBoutiqueRoutingModule } from './categorie-boutique-routing.module';
import { ListeCategorieComponent } from './liste-categorie/liste-categorie.component';
import { FormCategorieComponent } from './form-categorie/form.categorie.component';

@NgModule({
  declarations: [
    ListeCategorieComponent,
    FormCategorieComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbAlertModule,
    NbSpinnerModule,
    NbBadgeModule,
    CategorieBoutiqueRoutingModule,
  ],
})
export class CategorieBoutiqueModule {}
