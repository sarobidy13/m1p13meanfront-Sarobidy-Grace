import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VenteService } from '../vente.service';
import { BoutiqueService } from '../../boutique/boutique.service';

@Component({ selector: 'app-liste-vente', templateUrl: './liste-vente.component.html' })
export class ListeVenteComponent implements OnInit {
  ventes: any[] = [];
  boutiques: any[] = [];
  stats: any = {};
  filtreBoutique = '';
  loading = false;
  message = '';
  messageType = '';

  constructor(private venteService: VenteService, private boutiqueService: BoutiqueService, private router: Router) {}

  ngOnInit(): void {
    this.boutiqueService.getAll().subscribe({ next: (res) => this.boutiques = res.data });
    this.loadVentes();
    this.loadStats();
  }

  loadVentes(): void {
    this.loading = true;
    this.venteService.getAll(this.filtreBoutique || undefined).subscribe({
      next: (res) => { this.ventes = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  loadStats(): void {
    this.venteService.getStats().subscribe({ next: (res) => this.stats = res.data });
  }

  filtrer(): void { this.loadVentes(); }
  reinitialiser(): void { this.filtreBoutique = ''; this.loadVentes(); }
  voirDetails(id: string): void { this.router.navigate(['/pages/vente/detail', id]); }

  annuler(id: string): void {
    if (confirm('Annuler cette vente ? Les stocks seront remis.')) {
      this.venteService.annuler(id).subscribe({
        next: () => { this.message = 'Vente annulée'; this.messageType = 'success'; this.loadVentes(); this.loadStats(); },
        error: () => { this.message = 'Erreur'; this.messageType = 'danger'; },
      });
    }
  }
}
