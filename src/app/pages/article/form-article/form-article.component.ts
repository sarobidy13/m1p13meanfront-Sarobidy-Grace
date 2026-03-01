import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { BoutiqueService } from '../../boutique/boutique.service';

@Component({ selector: 'app-form-article', templateUrl: './form-article.component.html' })
export class FormArticleComponent implements OnInit {
  article: any = { nom: '', description: '', prix: '', quantite: '', seuilAlerte: 5, idBoutique: '', image: '' };
  boutiques: any[] = [];
  isEditMode = false;
  articleId = '';
  loading = false;
  message = '';
  messageType = '';

  constructor(private articleService: ArticleService, private boutiqueService: BoutiqueService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.boutiqueService.getAll().subscribe({ next: (res) => this.boutiques = res.data });
    this.articleId = this.route.snapshot.params['id'];
    if (this.articleId) {
      this.isEditMode = true;
      this.articleService.getById(this.articleId).subscribe({
        next: (res) => { this.article = res.data; this.article.idBoutique = res.data.idBoutique?._id; },
      });
    }
  }

  save(): void {
    this.loading = true;
    const action = this.isEditMode ? this.articleService.update(this.articleId, this.article) : this.articleService.create(this.article);
    action.subscribe({
      next: () => { this.loading = false; this.message = this.isEditMode ? 'Article modifié !' : 'Article créé !'; this.messageType = 'success'; setTimeout(() => this.router.navigate(['/pages/article']), 1500); },
      error: (err) => { this.loading = false; this.message = err.error?.error || 'Erreur'; this.messageType = 'danger'; },
    });
  }

  annuler(): void { this.router.navigate(['/pages/article']); }
}
