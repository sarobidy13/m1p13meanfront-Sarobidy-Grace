import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { PaiementModeService } from '../paiement/paiement-mode/paiement-mode.service';

@Component({ selector: 'app-panier', templateUrl: './panier.component.html' })
export class PanierComponent implements OnInit {
  panier: any[] = [];
  total = 0;
  showLogin = false;
  showRegister = false;
  showPaiement = false;
  loginData = { email: '', mdp: '' };
  registerData = { nom: '', prenom: '', email: '', mdp: '', tel: '' };
  loading = false;
  message = '';
  messageType = '';
  commandeSuccess = false;
  idVenteCreee = '';
  modesPaiement: any[] = [];
  paiementData = {
    idPaiementMode: '',
    referenceTransaction: '',
  };

  constructor(
    public clientService: ClientService,
    private router: Router,
    private paiementModeService: PaiementModeService
  ) {}

  ngOnInit(): void {
    this.clientService.panier$.subscribe(p => {
      this.panier = p;
      this.total = this.clientService.getTotalPanier();
    });
  }

  getBoutiques(): string[] { return [...new Set(this.panier.map(p => p.nomBoutique))]; }
  getArticlesBoutique(nom: string): any[] { return this.panier.filter(p => p.nomBoutique === nom); }

  commander(): void {
    if (this.panier.length === 0) return;
    const token = this.clientService.getToken();
    if (!token) { this.showLogin = true; return; }
    this.passerCommande();
  }

  login(): void {
    this.loading = true;
    this.clientService.login(this.loginData.email, this.loginData.mdp).subscribe({
      next: (res) => {
        if (res.role !== 3) { this.message = 'Ce compte n\'est pas un compte client'; this.messageType = 'danger'; this.loading = false; return; }
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', String(res.role));
        this.loading = false; this.showLogin = false;
        this.passerCommande();
      },
      error: (err) => { this.message = err.error?.message || 'Erreur'; this.messageType = 'danger'; this.loading = false; },
    });
  }

  register(): void {
    this.loading = true;
    this.clientService.register(this.registerData).subscribe({
      next: () => {
        this.message = 'Compte créé ! Connectez-vous.'; this.messageType = 'success';
        this.showRegister = false; this.showLogin = true;
        this.loginData.email = this.registerData.email;
        this.loading = false;
      },
      error: (err) => { this.message = err.error?.error || 'Erreur'; this.messageType = 'danger'; this.loading = false; },
    });
  }

  passerCommande(): void {
    this.loading = true;
    const idBoutique = this.panier[0]?.idBoutique;
    this.clientService.passerCommande(this.clientService.getToken()).subscribe({
      next: (res) => {
        this.loading = false;
        this.idVenteCreee = res.data._id;
        this.clientService.viderPanier();
        this.loadModesPaiement(idBoutique);
        this.showPaiement = true;
      },
      error: (err) => { this.message = err.error?.error || 'Erreur commande'; this.messageType = 'danger'; this.loading = false; },
    });
  }

  loadModesPaiement(idBoutique: string): void {
    if (!idBoutique) return;
    this.paiementModeService.getByBoutique(idBoutique).subscribe({
      next: (res) => {
        this.modesPaiement = res.data;
      },
      error: (err) => console.error('Erreur chargement modes paiement', err),
    });
  }

  soumettrePaiement(): void {
    if (!this.paiementData.idPaiementMode || !this.paiementData.referenceTransaction) {
      this.message = 'Veuillez remplir tous les champs';
      this.messageType = 'danger';
      return;
    }
    this.loading = true;
    this.clientService.initierPaiement({
      idVente: this.idVenteCreee,
      idPaiementMode: this.paiementData.idPaiementMode,
      montant: this.total,
      referenceTransaction: this.paiementData.referenceTransaction,
    }).subscribe({
      next: () => { this.loading = false; this.showPaiement = false; this.commandeSuccess = true; },
      error: (err) => { this.message = err.error?.error || 'Erreur paiement'; this.messageType = 'danger'; this.loading = false; },
    });
  }

  retour(): void { this.router.navigate(['/boutiques']); }
}