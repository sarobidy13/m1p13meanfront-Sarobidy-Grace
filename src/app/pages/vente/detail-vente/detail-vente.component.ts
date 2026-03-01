import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VenteService } from '../vente.service';

@Component({ selector: 'app-detail-vente', templateUrl: './detail-vente.component.html' })
export class DetailVenteComponent implements OnInit {
  vente: any = {};
  details: any[] = [];
  loading = false;

  constructor(private venteService: VenteService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.venteService.getById(id).subscribe({
      next: (res) => { this.vente = res.data.vente; this.details = res.data.details; this.loading = false; },
    });
  }

  retour(): void { this.router.navigate(['/pages/vente']); }
}
