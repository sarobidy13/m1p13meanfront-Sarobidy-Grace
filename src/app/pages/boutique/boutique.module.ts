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
  NbSelectModule,
} from '@nebular/theme';
import { BoutiqueRoutingModule } from './boutique-routing.module';
import { ListeBoutiqueComponent } from './liste-boutique/liste-boutique.component';
import { FormBoutiqueComponent } from './form-boutique/form-boutique.component';
import { DetailBoutiqueComponent } from './details-boutique/detail-boutique.component';

@NgModule({
  declarations: [
    ListeBoutiqueComponent,
    FormBoutiqueComponent,
    DetailBoutiqueComponent,
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
    NbSelectModule,
    BoutiqueRoutingModule,
  ],
})
export class BoutiqueModule {}
