import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VenteService } from '../vente.service';
import { ArticleService } from '../../article/article.service';
import { BoutiqueService } from '../../boutique/boutique.service';

@Component({ selector: 'app-form-vente', templateUrl: './form-vente.component.html' })
export class FormVenteComponent implements OnInit {
  boutiques: any[] = [];
  articles: any[] = [];
  idBoutique = '';
  panier: any[] = [];
  montantTotal = 0;
  loading = false;
  message = '';
  messageType = '';

  constructor(private venteService: VenteService, private articleService: ArticleService, private boutiqueService: BoutiqueService, private router: Router) {}

  ngOnInit(): void {
    this.boutiqueService.getAll().subscribe({ next: (res) => this.boutiques = res.data });
  }

  onBoutiqueChange(): void {
    if (this.idBoutique) {
      this.articleService.getAll(this.idBoutique).subscribe({
        next: (res) => this.articles = res.data.filter((a: any) => a.status && a.quantite > 0),
      });
      this.panier = [];
      this.montantTotal = 0;
    }
  }

  ajouterAuPanier(article: any): void {
    const exist = this.panier.find(p => p.idArticle === article._id);
    if (exist) {
      if (exist.quantite < article.quantite) exist.quantite++;
    } else {
      this.panier.push({ idArticle: article._id, nom: article.nom, prixUnitaire: article.prix, quantite: 1, stockDispo: article.quantite });
    }
    this.calculerTotal();
  }

  retirerDuPanier(index: number): void { this.panier.splice(index, 1); this.calculerTotal(); }

  modifierQuantite(item: any, delta: number): void {
    item.quantite += delta;
    if (item.quantite <= 0) this.panier = this.panier.filter(p => p !== item);
    if (item.quantite > item.stockDispo) item.quantite = item.stockDispo;
    this.calculerTotal();
  }

  calculerTotal(): void {
    this.montantTotal = this.panier.reduce((sum, p) => sum + (p.quantite * p.prixUnitaire), 0);
  }

  save(): void {
    if (!this.idBoutique || this.panier.length === 0) {
      this.message = 'Sélectionnez une boutique et ajoutez des articles'; this.messageType = 'warning'; return;
    }
    this.loading = true;
    this.venteService.create({ idBoutique: this.idBoutique, articles: this.panier }).subscribe({
      next: () => { this.loading = false; this.message = 'Vente enregistrée !'; this.messageType = 'success'; setTimeout(() => this.router.navigate(['/pages/vente']), 1500); },
      error: (err) => { this.loading = false; this.message = err.error?.error || 'Erreur'; this.messageType = 'danger'; },
    });
  }

  annuler(): void { this.router.navigate(['/pages/vente']); }
}
