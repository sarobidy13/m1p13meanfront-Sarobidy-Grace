import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutiqueService } from '../boutique.service';

@Component({
  selector: 'app-detail-boutique',
  templateUrl: './detail-boutique.component.html',
})
export class DetailBoutiqueComponent implements OnInit {
  boutique: any = {};
  loading = false;

  constructor(
    private boutiqueService: BoutiqueService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.boutiqueService.getById(id).subscribe({
      next: (res) => {
        this.boutique = res.data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  retour(): void {
    this.router.navigate(['/pages/boutique']);
  }
}
