import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({ selector: 'app-boutiques', templateUrl: './boutiques.component.html' })
export class BoutiquesComponent implements OnInit {
  boutiques: any[] = [];
  loading = false;
  constructor(private clientService: ClientService, private router: Router) {}
  ngOnInit(): void {
    this.loading = true;
    this.clientService.getBoutiques().subscribe({
      next: (res) => { this.boutiques = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
  voirBoutique(id: string): void { this.router.navigate(['/boutiques', id]); }
}
