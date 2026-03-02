import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
})
export class ListeUtilisateurComponent implements OnInit {
  utilisateurs: any[] = [];
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.loading = true;
    this.utilisateurService.getAll().subscribe({
      next: (res) => {
        this.utilisateurs = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  modifier(id: string): void {
    this.router.navigate(['/pages/utilisateur/form', id]);
  }

  getRoleLabel(role: number): string {
    const labels: Record<number, string> = {
       0: 'Admin',
      1: 'Admin',
      2: 'Gérant Boutique',
      3: 'Client',
    };
    return labels[role] ?? 'Inconnu';
  }

  getRoleColor(role: number): string {
    const colors: Record<number, string> = {
      0: '#6a49e8',
      1: '#6a49e8',
      2: '#00b887',
      3: '#0095ff',
    };
    return colors[role] ?? '#8b8b89';
  }
}