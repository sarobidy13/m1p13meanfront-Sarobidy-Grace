import { Component, Input } from '@angular/core';
import { NbDialogRef, NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, NbCardModule, NbButtonModule, NbIconModule],
  template: `
    <nb-card style="max-width:420px;border-radius:16px;">
      <nb-card-header style="border-bottom:1px solid #f0e8e0;padding:20px 24px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;background:#fff0e8;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <nb-icon icon="credit-card-outline" style="color:#8B4513;font-size:1.2rem;"></nb-icon>
          </div>
          <h6 style="margin:0;color:#3a2010;font-weight:700;">Confirmation de paiement</h6>
        </div>
      </nb-card-header>
      <nb-card-body style="padding:24px;">
        <p style="color:#555;margin:0 0 8px 0;">Voulez-vous confirmer le paiement du loyer de :</p>
        <div style="background:#f5f0e8;border-radius:10px;padding:14px;border-left:3px solid #8B4513;">
          <p style="margin:0;font-weight:700;color:#8B4513;font-size:1.1rem;">{{ periode }}</p>
          <p style="margin:4px 0 0 0;color:#3a2010;font-size:1rem;">{{ montant }}</p>
        </div>
      </nb-card-body>
      <nb-card-footer style="display:flex;gap:12px;justify-content:flex-end;padding:16px 24px;border-top:1px solid #f0e8e0;">
        <button nbButton status="basic" (click)="annuler()">Annuler</button>
        <button nbButton status="success" (click)="confirmer()">
          <nb-icon icon="checkmark-outline"></nb-icon> Confirmer
        </button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class ConfirmDialogComponent {
  @Input() periode = '';
  @Input() montant = '';

  constructor(private dialogRef: NbDialogRef<ConfirmDialogComponent>) {}

  confirmer(): void { this.dialogRef.close(true); }
  annuler(): void { this.dialogRef.close(false); }
}
