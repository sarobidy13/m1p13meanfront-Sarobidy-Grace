import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';
import { CategorieBoutiqueService } from '../../categorie-boutique/categorie-boutique.service';

@Component({
  selector: 'app-form-boutique',
  templateUrl: './form-boutique.component.html',
})
export class FormBoutiqueComponent implements OnInit {
  boutique: any = {
    nom: '',
    description: '',
    idCategorie: '',
    box: '',
    etage: '',
    logo: '',
    dateFinLocation: '',
  };

  categories: any[] = [];
  etages = ['RDC', '1', '2', '3'];
  isEditMode = false;
  boutiqueId: string = '';
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private boutiqueService: BoutiqueService,
    private categorieService: CategorieBoutiqueService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.boutiqueId = this.route.snapshot.params['id'];
    if (this.boutiqueId) {
      this.isEditMode = true;
      this.loadBoutique();
    }
  }

  loadCategories(): void {
    this.categorieService.getAll().subscribe({
      next: (res) => this.categories = res.data,
    });
  }

  loadBoutique(): void {
    this.boutiqueService.getById(this.boutiqueId).subscribe({
      next: (res) => {
        this.boutique = res.data;
        this.boutique.idCategorie = res.data.idCategorie?._id;
      },
    });
  }

  save(): void {
    this.loading = true;
    const action = this.isEditMode
      ? this.boutiqueService.update(this.boutiqueId, this.boutique)
      : this.boutiqueService.create(this.boutique);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.message = this.isEditMode ? 'Boutique modifiée !' : 'Boutique créée !';
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/pages/boutique']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.error || 'Erreur lors de la sauvegarde';
        this.messageType = 'danger';
      },
    });
  }

  annuler(): void {
    this.router.navigate(['/pages/boutique']);
  }
}
