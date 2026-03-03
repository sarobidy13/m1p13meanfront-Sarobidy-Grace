import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur.service';
import { BoutiqueService } from '../../boutique/boutique.service';

@Component({
  selector: 'app-form-utilisateur',
  templateUrl: './form-utilisateur.component.html',
})
export class FormUtilisateurComponent implements OnInit {

  isEditMode = false;
  userId = '';
  message = '';
  messageType = '';
  boutiques: any[] = [];

  user: any = {
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    role: '',
    mdp: '',
    idBoutique: '',
  };

  constructor(
    private utilisateurService: UtilisateurService,
    private boutiqueService: BoutiqueService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadBoutiques();
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.userId) {
      this.isEditMode = true;
      this.loadUser();
    }
  }

  loadBoutiques(): void {
  this.boutiqueService.getAll().subscribe({
    next: (res) => {
      this.boutiques = res.data;
    },
    error: (err) => console.error('Erreur chargement boutiques', err),
  });
}

onRoleChange(role: any): void {
}
  loadUser(): void {
    this.utilisateurService.getById(this.userId).subscribe({
      next: (res) => this.user = res.data,
      error: () => {
        this.message = 'Erreur lors du chargement';
        this.messageType = 'danger';
      }
    });
  }

  submit(): void {
    if (this.isEditMode) {
      this.utilisateurService.update(this.userId, this.user).subscribe({
        next: () => {
          this.message = 'Utilisateur modifié avec succès';
          this.messageType = 'success';
          setTimeout(() => this.router.navigate(['/pages/utilisateur']), 1500);
        },
        error: () => {
          this.message = 'Erreur lors de la modification';
          this.messageType = 'danger';
        }
      });
    } else {
      this.utilisateurService.create(this.user).subscribe({
        next: () => {
          this.message = 'Utilisateur créé avec succès';
          this.messageType = 'success';
          setTimeout(() => this.router.navigate(['/pages/utilisateur']), 1500);
        },
        error: () => {
          this.message = 'Erreur lors de la création';
          this.messageType = 'danger';
        }
      });
    }
  }
}