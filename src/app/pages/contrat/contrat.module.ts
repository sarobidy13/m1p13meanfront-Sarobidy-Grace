import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule, NbButtonModule, NbInputModule,
  NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule,
} from '@nebular/theme';
import { ContratRoutingModule } from './contrat-routing.module';
import { ListeContratComponent } from './liste-contrat/liste-contrat.component';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { DetailContratComponent } from './detail-contrat/detail-contrat.component';

@NgModule({
  declarations: [ListeContratComponent, FormContratComponent, DetailContratComponent],
  imports: [
    CommonModule, FormsModule,
    NbCardModule, NbButtonModule, NbInputModule,
    NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule,
    ContratRoutingModule,
  ],
})
export class ContratModule {}
