import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule, NbButtonModule, NbInputModule,
  NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule,
} from '@nebular/theme';
import { LoyerRoutingModule } from './loyer-routing.module';
import { ListeLoyerComponent } from './liste-loyer/liste-loyer.component';

@NgModule({
  declarations: [ListeLoyerComponent],
  imports: [
    CommonModule, FormsModule,
    NbCardModule, NbButtonModule, NbInputModule,
    NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule,
    LoyerRoutingModule,
  ],
})
export class LoyerModule {}
