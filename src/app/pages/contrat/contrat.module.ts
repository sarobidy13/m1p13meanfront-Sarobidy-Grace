import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // 👈 AJOUTE ÇA

import {
  NbCardModule, NbButtonModule, NbInputModule,
  NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule,
  NbDialogModule,
} from '@nebular/theme';

import { ContratRoutingModule } from './contrat-routing.module';

import { ListeContratComponent } from './liste-contrat/liste-contrat.component';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { DetailContratComponent } from './detail-contrat/detail-contrat.component';
import { ConfirmDialogComponent } from './detail-contrat/confirm-dialog.component';

@NgModule({
  declarations: [
    ListeContratComponent,
    FormContratComponent,
    DetailContratComponent, // 👈 ICI (pas dans imports)
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // 👈 IMPORTANT
    ContratRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbAlertModule,
    NbSpinnerModule,
    NbSelectModule,
    NbDialogModule.forChild(),
    ConfirmDialogComponent,
  ],
})
export class ContratModule {}
