import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { BoutiqueService } from '../../boutique/boutique.service';

@Component({
  selector: 'app-stock-boutique',
  templateUrl: './stock-boutique.component.html',
})
export class StockBoutiqueComponent implements OnInit {
  boutiques: any[] = [];
  boutique: any = null;
  idBoutiqueSelect = '';
  articles: any[] = [];
  articlesFiltres: any[] = [];
  mouvements: any[] = [];
  articleSelectionne: any = null;
  filtreAlerte = false;
  quantiteEntree = 0;
  motifEntree = '';
  loading = false;
  loadingMouvements = false;
  message = '';
  messageType = '';

  constructor(private stockService: StockService, private boutiqueService: BoutiqueService) {}

  ngOnInit(): void {
    this.boutiqueService.getAll().subscribe({ next: (res) => this.boutiques = res.data });
  }

  onBoutiqueChange(): void {
    if (!this.idBoutiqueSelect) return;
    this.boutique = this.boutiques.find(b => b._id === this.idBoutiqueSelect);
    this.loading = true;
    this.articles = [];
    this.mouvements = [];
    this.articleSelectionne = null;
    this.stockService.getArticlesByBoutique(this.idBoutiqueSelect).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.articlesFiltres = res.data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  filtrerAlerte(): void {
    if (this.filtreAlerte) {
      this.articlesFiltres = this.articles.filter(a => a.quantite <= a.seuilAlerte);
    } else {
      this.articlesFiltres = this.articles;
    }
  }

  voirMouvements(article: any): void {
    this.articleSelectionne = article;
    this.loadingMouvements = true;
    this.mouvements = [];
    this.stockService.getMouvementsByArticle(article._id).subscribe({
      next: (res) => { this.mouvements = res.data; this.loadingMouvements = false; },
      error: () => this.loadingMouvements = false,
    });
  }

  entreeStock(article: any): void {
    if (this.quantiteEntree <= 0) {
      this.message = 'Quantité invalide'; this.messageType = 'warning'; return;
    }
    this.stockService.entreeStock(article._id, this.quantiteEntree, this.motifEntree).subscribe({
      next: () => {
        this.message = `Entrée de ${this.quantiteEntree} unités enregistrée pour ${article.nom}`;
        this.messageType = 'success';
        this.quantiteEntree = 0;
        this.motifEntree = '';
        this.onBoutiqueChange();
        if (this.articleSelectionne?._id === article._id) this.voirMouvements(article);
      },
      error: () => { this.message = 'Erreur'; this.messageType = 'danger'; },
    });
  }

  getStockColor(article: any): string {
    if (article.quantite === 0) return '#ff3d71';
    if (article.quantite <= article.seuilAlerte) return '#ffaa00';
    return '#00d68f';
  }

  getStockLabel(article: any): string {
    if (article.quantite === 0) return 'Rupture';
    if (article.quantite <= article.seuilAlerte) return 'Stock faible';
    return 'OK';
  }

  get nbAlertes(): number {
    return this.articles.filter(a => a.quantite <= a.seuilAlerte).length;
  }

  get nbRuptures(): number {
    return this.articles.filter(a => a.quantite === 0).length;
  }
}
