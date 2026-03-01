import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieBoutiqueService } from '../categorie-boutique.service';

@Component({
  selector: 'app-liste-categorie',
  templateUrl: './liste-categorie.component.html',
})
export class ListeCategorieComponent implements OnInit {
  categories: any[] = [];
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private categorieService: CategorieBoutiqueService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categorieService.getAll().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  modifier(id: string): void {
    this.router.navigate(['/pages/categorie-boutique/form', id]);
  }

  desactiver(id: string): void {
    if (confirm('Voulez-vous désactiver cette catégorie ?')) {
      this.categorieService.desactiver(id).subscribe({
        next: () => {
          this.message = 'Catégorie désactivée avec succès';
          this.messageType = 'success';
          this.loadCategories();
        },
        error: () => {
          this.message = 'Erreur lors de la désactivation';
          this.messageType = 'danger';
        },
      });
    }
  }
}
