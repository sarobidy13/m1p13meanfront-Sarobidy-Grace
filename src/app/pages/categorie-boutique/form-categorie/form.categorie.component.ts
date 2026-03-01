import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieBoutiqueService } from '../categorie-boutique.service';

@Component({
  selector: 'app-form-categorie',
  templateUrl: './form-categorie.component.html',
})
export class FormCategorieComponent implements OnInit {
  categorie: any = { nom: '', description: '' };
  isEditMode = false;
  categorieId: string = '';
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private categorieService: CategorieBoutiqueService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categorieId = this.route.snapshot.params['id'];
    if (this.categorieId) {
      this.isEditMode = true;
      this.loadCategorie();
    }
  }

  loadCategorie(): void {
    this.categorieService.getById(this.categorieId).subscribe({
      next: (res) => {
        this.categorie = res.data;
      },
    });
  }

  save(): void {
    this.loading = true;
    const action = this.isEditMode
      ? this.categorieService.update(this.categorieId, this.categorie)
      : this.categorieService.create(this.categorie);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.message = this.isEditMode ? 'Catégorie modifiée !' : 'Catégorie créée !';
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/pages/categorie-boutique']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.error || 'Erreur lors de la sauvegarde';
        this.messageType = 'danger';
      },
    });
  }

  annuler(): void {
    this.router.navigate(['/pages/categorie-boutique']);
  }
}
