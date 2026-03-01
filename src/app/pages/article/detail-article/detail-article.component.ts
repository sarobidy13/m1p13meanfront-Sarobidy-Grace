import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({ selector: 'app-detail-article', templateUrl: './detail-article.component.html' })
export class DetailArticleComponent implements OnInit {
  article: any = {};
  mouvements: any[] = [];
  historiquePrix: any[] = [];
  loading = false;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.articleService.getById(id).subscribe({
      next: (res) => {
        this.article = res.data; this.loading = false;
        this.articleService.getMouvements(id).subscribe({ next: (r) => this.mouvements = r.data });
        this.articleService.getHistoriquePrix(id).subscribe({ next: (r) => this.historiquePrix = r.data });
      },
    });
  }

  isEnAlerte(): boolean { return this.article.quantite <= this.article.seuilAlerte; }
  retour(): void { this.router.navigate(['/pages/article']); }
  modifier(): void { this.router.navigate(['/pages/article/form', this.article._id]); }
  entreeStock(): void { this.router.navigate(['/pages/article/entree', this.article._id]); }
}
