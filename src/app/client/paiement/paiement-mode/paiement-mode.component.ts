// paiement-mode-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbRadioModule,
  NbSelectModule,
} from '@nebular/theme';
import { PaiementMode, PaiementModeService } from './paiement-mode.service';

@Component({
  templateUrl: './paiement-mode.component.html',
  styleUrls: ['./paiement-mode.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbRadioModule,
    NbSelectModule
  ]
})
export class PaiementModeFormComponent {

  paiementMode: PaiementMode = {
    idBoutique: '',
    type: 'mobile_money' as 'espece' | 'mobile_money' | 'virement' | 'carte',
    details: {
      nomReseau:       '',
      numeroTelephone: '',
      nomTitulaire:    '',
      rib:             '',
      numeroCarte:     '',
    }
  };

  constructor(private paiementModeService: PaiementModeService) {}

 submitPaiementMode() {
  this.paiementModeService.add(this.paiementMode).subscribe({
    next: () => {},
    error: (err) => console.error(err),
  });
}
}