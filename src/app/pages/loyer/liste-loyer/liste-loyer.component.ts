import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoyerService } from '../loyer.service';

@Component({
  selector: 'app-liste-loyer',
  templateUrl: './liste-loyer.component.html',
})
export class ListeLoyerComponent implements OnInit {
  boutiquesLoyers: any[] = []; // 1 ligne par boutique
  loading = false;

  constructor(private loyerService: LoyerService, private router: Router) {}

  ngOnInit(): void { this.loadLoyers(); }

  loadLoyers(): void {
    this.loading = true;
    this.loyerService.getAll().subscribe({
      next: (res) => {
        // Grouper par boutique
        const grouped: any = {};
        res.data.forEach((loyer: any) => {
          const boutiqueId = loyer.idContrat?.idBoutique?._id;
          const boutiqueNom = loyer.idContrat?.idBoutique?.nom;
          if (!grouped[boutiqueId]) {
            grouped[boutiqueId] = {
              boutiqueId,
              boutiqueNom,
              totalLoyers: 0,
              totalPaye: 0,
              totalImpaye: 0,
              enRetard: 0,
              idContrat: loyer.idContrat?._id,
            };
          }
          grouped[boutiqueId].totalLoyers++;
          if (loyer.status === 'paye') grouped[boutiqueId].totalPaye++;
          if (loyer.status === 'en_retard') grouped[boutiqueId].enRetard++;
          if (loyer.status !== 'paye') grouped[boutiqueId].totalImpaye++;
        });
        this.boutiquesLoyers = Object.values(grouped);
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  voirDetails(idContrat: string): void {
    this.router.navigate(['/pages/contrat/detail', idContrat]);
  }
}
