import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { BoutiqueService } from '../../boutique/boutique.service';

@Component({ selector: 'app-liste-article', templateUrl: './liste-article.component.html' })
export class ListeArticleComponent implements OnInit {
  articles: any[] = [];
  boutiques: any[] = [];
  filtreBoutique = '';
  loading = false;
  message = '';
  messageType = '';

  constructor(private articleService: ArticleService, private boutiqueService: BoutiqueService, private router: Router) {}

  get hasAlertes(): boolean {
    return this.articles.some(a => a.quantite <= a.seuilAlerte);
  }

  ngOnInit(): void {
    this.boutiqueService.getAll().subscribe({ next: (res) => this.boutiques = res.data });
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    this.articleService.getAll(this.filtreBoutique || undefined).subscribe({
      next: (res) => { this.articles = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  filtrer(): void { this.loadArticles(); }
  reinitialiser(): void { this.filtreBoutique = ''; this.loadArticles(); }
  voirDetails(id: string): void { this.router.navigate(['/pages/article/detail', id]); }
  modifier(id: string): void { this.router.navigate(['/pages/article/form', id]); }
  entreeStock(id: string): void { this.router.navigate(['/pages/article/entree', id]); }
  isEnAlerte(a: any): boolean { return a.quantite <= a.seuilAlerte; }

  desactiver(id: string): void {
    if (confirm('Désactiver cet article ?')) {
      this.articleService.desactiver(id).subscribe({
        next: () => { this.message = 'Article désactivé'; this.messageType = 'success'; this.loadArticles(); },
        error: () => { this.message = 'Erreur'; this.messageType = 'danger'; },
      });
    }
  }
}
