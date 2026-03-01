import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({ selector: 'app-entree-stock', templateUrl: './entree-stock.component.html' })
export class EntreeStockComponent implements OnInit {
  article: any = {};
  quantite = 0;
  motif = '';
  loading = false;
  message = '';
  messageType = '';
  articleId = '';

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    this.articleService.getById(this.articleId).subscribe({ next: (res) => this.article = res.data });
  }

  save(): void {
    this.loading = true;
    this.articleService.entreeStock(this.articleId, this.quantite, this.motif).subscribe({
      next: () => { this.loading = false; this.message = 'Entrée enregistrée !'; this.messageType = 'success'; setTimeout(() => this.router.navigate(['/pages/article']), 1500); },
      error: (err) => { this.loading = false; this.message = err.error?.error || 'Erreur'; this.messageType = 'danger'; },
    });
  }

  annuler(): void { this.router.navigate(['/pages/article']); }
}
