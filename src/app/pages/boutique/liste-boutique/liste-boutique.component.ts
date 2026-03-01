import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';
import { CategorieBoutiqueService } from '../../categorie-boutique/categorie-boutique.service';

@Component({
  selector: 'app-liste-boutique',
  templateUrl: './liste-boutique.component.html',
})
export class ListeBoutiqueComponent implements OnInit {
  boutiques: any[] = [];
  categories: any[] = [];
  loading = false;
  message = '';
  messageType = '';

  // Filtres
  filtreCategorie = '';
  filtreEtage = '';
  filtreStatus = '';

  etages = ['RDC', '1', '2', '3'];

  constructor(
    private boutiqueService: BoutiqueService,
    private categorieService: CategorieBoutiqueService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBoutiques();
  }

  loadCategories(): void {
    this.categorieService.getAll().subscribe({
      next: (res) => this.categories = res.data,
    });
  }

  loadBoutiques(): void {
    this.loading = true;
    const filters: any = {};
    if (this.filtreCategorie) filters.idCategorie = this.filtreCategorie;
    if (this.filtreEtage) filters.etage = this.filtreEtage;
    if (this.filtreStatus !== '') filters.status = this.filtreStatus;

    this.boutiqueService.getAll(filters).subscribe({
      next: (res) => {
        this.boutiques = res.data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  filtrer(): void {
    this.loadBoutiques();
  }

  reinitialiser(): void {
    this.filtreCategorie = '';
    this.filtreEtage = '';
    this.filtreStatus = '';
    this.loadBoutiques();
  }

  modifier(id: string): void {
    this.router.navigate(['/pages/boutique/form', id]);
  }

  voirDetails(id: string): void {
    this.router.navigate(['/pages/boutique/detail', id]);
  }

  desactiver(id: string): void {
    if (confirm('Voulez-vous désactiver cette boutique ?')) {
      this.boutiqueService.desactiver(id).subscribe({
        next: () => {
          this.message = 'Boutique désactivée avec succès';
          this.messageType = 'success';
          this.loadBoutiques();
        },
        error: () => {
          this.message = 'Erreur lors de la désactivation';
          this.messageType = 'danger';
        },
      });
    }
  }
}
