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
  imagePreview: string = '';
  selectedFile: File | null = null;

  constructor(
    private articleService: ArticleService,
    private boutiqueService: BoutiqueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boutiqueService.getAll().subscribe({ next: (res) => this.boutiques = res.data });
    this.articleId = this.route.snapshot.params['id'];
    if (this.articleId) {
      this.isEditMode = true;
      this.articleService.getById(this.articleId).subscribe({
        next: (res) => {
          this.article = res.data;
          this.article.idBoutique = res.data.idBoutique?._id;
          if (res.data.image) this.imagePreview = 'http://localhost:5000' + res.data.image;
        },
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => this.imagePreview = e.target.result;
    reader.readAsDataURL(file);
  }

  save(): void {
    // Vérification avant tout
    console.log('Article avant save:', this.article);

    this.loading = true;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      this.articleService.uploadImage(formData).subscribe({
        next: (res) => {
          this.article.image = res.url;
          console.log('Article après upload:', this.article); // ← vérifiez ici
          this.saveArticle();
        },
        error: () => {
          this.message = "Erreur upload image";
          this.messageType = 'danger';
          this.loading = false;
        }
      });
    } else {
      this.saveArticle();
    }
  }

  private saveArticle(): void {
    const action = this.isEditMode
      ? this.articleService.update(this.articleId, this.article)
      : this.articleService.create(this.article);
    action.subscribe({
      next: () => {
        this.loading = false;
        this.message = this.isEditMode ? 'Article modifié !' : 'Article créé !';
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/pages/article']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.error || 'Erreur';
        this.messageType = 'danger';
      },
    });
  }

  annuler(): void { this.router.navigate(['/pages/article']); }
}
