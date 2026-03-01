import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule, NbButtonModule, NbInputModule, NbIconModule,
  NbAlertModule, NbSpinnerModule, NbSelectModule,
} from '@nebular/theme';
import { StockRoutingModule } from './stock-routing.module';
import { StockBoutiqueComponent } from './stock-boutique/stock-boutique.component';

@NgModule({
  declarations: [StockBoutiqueComponent],
  imports: [
    CommonModule, FormsModule,
    NbCardModule, NbButtonModule, NbInputModule, NbIconModule,
    NbAlertModule, NbSpinnerModule, NbSelectModule,
    StockRoutingModule,
  ],
})
export class StockModule {}
