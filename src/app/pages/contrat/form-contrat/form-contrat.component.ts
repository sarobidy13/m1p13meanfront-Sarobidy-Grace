import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from '../contrat.service';
import { BoutiqueService } from '../../boutique/boutique.service';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
})
export class FormContratComponent implements OnInit {
  contrat: any = { idBoutique: '', dateDebut: '', dateFin: '', montantMensuel: '', status: 'actif' };
  boutiques: any[] = [];
  isEditMode = false;
  contratId = '';
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private contratService: ContratService,
    private boutiqueService: BoutiqueService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.boutiqueService.getAll({ status: true }).subscribe({ next: (res) => this.boutiques = res.data });
    this.contratId = this.route.snapshot.params['id'];
    if (this.contratId) {
      this.isEditMode = true;
      this.contratService.getById(this.contratId).subscribe({
        next: (res) => {
          this.contrat = res.data;
          this.contrat.idBoutique = res.data.idBoutique?._id;
          this.contrat.dateDebut = res.data.dateDebut?.substring(0, 10);
          this.contrat.dateFin = res.data.dateFin?.substring(0, 10);
        },
      });
    }
  }

  save(): void {
    this.loading = true;
    const action = this.isEditMode
      ? this.contratService.update(this.contratId, this.contrat)
      : this.contratService.create(this.contrat);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.message = this.isEditMode ? 'Contrat modifié !' : 'Contrat créé et loyers générés !';
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/pages/contrat']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.error || 'Erreur';
        this.messageType = 'danger';
      },
    });
  }

  annuler(): void { this.router.navigate(['/pages/contrat']); }
}
