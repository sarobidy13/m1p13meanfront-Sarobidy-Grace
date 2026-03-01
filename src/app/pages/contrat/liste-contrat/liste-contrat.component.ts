import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratService } from '../contrat.service';

@Component({
  selector: 'app-liste-contrat',
  templateUrl: './liste-contrat.component.html',
})
export class ListeContratComponent implements OnInit {
  contrats: any[] = [];
  contratsFiltres: any[] = [];
  filtreStatus = '';
  loading = false;
  message = '';
  messageType = '';

  constructor(private contratService: ContratService, private router: Router) {}

  ngOnInit(): void { this.loadContrats(); }

  loadContrats(): void {
    this.loading = true;
    this.contratService.getAll().subscribe({
      next: (res) => {
        this.contrats = res.data;
        this.contratsFiltres = res.data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  filtrer(): void {
    if (this.filtreStatus) {
      this.contratsFiltres = this.contrats.filter(c => c.status === this.filtreStatus);
    } else {
      this.contratsFiltres = this.contrats;
    }
  }

  reinitialiser(): void {
    this.filtreStatus = '';
    this.contratsFiltres = this.contrats;
  }

  voirDetails(id: string): void { this.router.navigate(['/pages/contrat/detail', id]); }
  modifier(id: string): void { this.router.navigate(['/pages/contrat/form', id]); }

  resilier(id: string): void {
    if (confirm('Voulez-vous résilier ce contrat ?')) {
      this.contratService.resilier(id).subscribe({
        next: () => { this.message = 'Contrat résilié'; this.messageType = 'success'; this.loadContrats(); },
        error: () => { this.message = 'Erreur'; this.messageType = 'danger'; },
      });
    }
  }

  getStatusColor(status: string): string {
    if (status === 'actif') return '#00d68f';
    if (status === 'resilie') return '#ff3d71';
    return '#ffaa00';
  }
}
