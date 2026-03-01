import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule } from '@nebular/theme';
import { VenteRoutingModule } from './vente-routing.module';
import { ListeVenteComponent } from './liste-vente/liste-vente.component';
import { FormVenteComponent } from './form-vente/form-vente.component';
import { DetailVenteComponent } from './detail-vente/detail-vente.component';

@NgModule({
  declarations: [ListeVenteComponent, FormVenteComponent, DetailVenteComponent],
  imports: [CommonModule, FormsModule, NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbAlertModule, NbSpinnerModule, NbSelectModule, VenteRoutingModule],
})
export class VenteModule {}
