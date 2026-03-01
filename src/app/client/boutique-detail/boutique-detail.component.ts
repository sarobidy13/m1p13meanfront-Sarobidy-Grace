import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({ selector: 'app-boutique-detail', templateUrl: './boutique-detail.component.html' })
export class BoutiqueDetailComponent implements OnInit {
  boutique: any = null;
  articles: any[] = [];
  panier: any[] = [];
  search = '';
  loading = false;
  message = '';
  constructor(public clientService: ClientService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.clientService.getBoutiques().subscribe({
      next: (res) => { this.boutique = res.data.find((b: any) => b._id === id); this.loadArticles(); }
    });
    this.clientService.panier$.subscribe(p => this.panier = p);
  }
  loadArticles(): void {
    if (!this.boutique) return;
    this.clientService.getArticles(this.boutique._id, this.search).subscribe({
      next: (res) => { this.articles = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
  filtrer(): void { this.loadArticles(); }
  reinitialiser(): void { this.search = ''; this.loadArticles(); }
  ajouterAuPanier(article: any): void {
    if (article.quantite <= 0) return;
    this.clientService.ajouterAuPanier(article, this.boutique);
    this.message = `${article.nom} ajouté !`;
    setTimeout(() => this.message = '', 2000);
  }
  isInPanier(id: string): boolean { return this.panier.some(p => p.idArticle === id); }
  getQtePanier(id: string): number { return this.panier.find(p => p.idArticle === id)?.quantite || 0; }
  totalPanier(): number { return this.clientService.getTotalPanier(); }
  retour(): void { this.router.navigate(['/boutiques']); }
  voirPanier(): void { this.router.navigate(['/boutiques/panier']); }
}
