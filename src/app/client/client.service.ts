import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  
  // private readonly API = 'http://localhost:5000';
  private readonly API = 'https://m1p13meanback-sarobidy-grace.onrender.com';
  private panierSubject = new BehaviorSubject<any[]>(this.loadPanier());
  panier$ = this.panierSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Routes publiques
  getBoutiques(): Observable<any> { return this.http.get(`${this.API}/public/boutiques`); }
  getArticles(idBoutique: string, search = '', idCategorie = ''): Observable<any> {
    let url = `${this.API}/public/articles?idBoutique=${idBoutique}`;
    if (search) url += `&search=${search}`;
    if (idCategorie) url += `&idCategorie=${idCategorie}`;
    return this.http.get(url);
  }
  getCategories(): Observable<any> { return this.http.get(`${this.API}/categorieBoutique/`); }

  // Connexion client
  login(email: string, mdp: string): Observable<any> {
    return this.http.post(`${this.API}/user/login`, { email, mdp });
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.API}/user/nouveau`, { ...data, role: 3 });
  }

  // Panier local
  loadPanier(): any[] {
    try { return JSON.parse(sessionStorage.getItem('panier') || '[]'); } catch { return []; }
  }
  savePanier(panier: any[]): void {
    sessionStorage.setItem('panier', JSON.stringify(panier));
    this.panierSubject.next(panier);
  }
  ajouterAuPanier(article: any, boutique: any): void {
    const panier = this.loadPanier();
    const exist = panier.find(p => p.idArticle === article._id);
    if (exist) {
      if (exist.quantite < article.quantite) exist.quantite++;
    } else {
      panier.push({
        idArticle: article._id,
        nom: article.nom,
        prixUnitaire: article.prix,
        quantite: 1,
        stockDispo: article.quantite,
        idBoutique: boutique._id,
        nomBoutique: boutique.nom,
        image: `${this.API}${article.image}`
      });
    }
    this.savePanier(panier);
  }
  retirerDuPanier(idArticle: string): void {
    const panier = this.loadPanier().filter(p => p.idArticle !== idArticle);
    this.savePanier(panier);
  }
  modifierQuantite(idArticle: string, delta: number): void {
    const panier = this.loadPanier();
    const item = panier.find(p => p.idArticle === idArticle);
    if (item) {
      item.quantite += delta;
      if (item.quantite <= 0) { this.retirerDuPanier(idArticle); return; }
      if (item.quantite > item.stockDispo) item.quantite = item.stockDispo;
    }
    this.savePanier(panier);
  }
  viderPanier(): void { this.savePanier([]); }
  getTotalPanier(): number {
    return this.loadPanier().reduce((s, p) => s + (p.quantite * p.prixUnitaire), 0);
  }

  // Passer commande
  passerCommande(token: string): Observable<any> {
    const panier = this.loadPanier();
    const boutiques = [...new Set(panier.map(p => p.idBoutique))];
    const commandes = boutiques.map(idBoutique => ({
      idBoutique,
      articles: panier.filter(p => p.idBoutique === idBoutique).map(p => ({
        idArticle: p.idArticle, quantite: p.quantite, prixUnitaire: p.prixUnitaire,
      })),
    }));
    return this.http.post(`${this.API}/vente/commande`, { commandes }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getModesPaiement(idBoutique: string): Observable<any> {
  return this.http.get(`${this.API}/paiement-modes/boutique/${idBoutique}`);
}

initierPaiement(data: any): Observable<any> {
  return this.http.post(`${this.API}/paiements/initier`, data, {
    headers: { Authorization: `Bearer ${this.getToken()}` }
  });
}

  isLoggedIn(): boolean { return !!localStorage.getItem('token') && localStorage.getItem('role') === '3'; }
  getToken(): string { return localStorage.getItem('token') || ''; }
  logout(): void { localStorage.removeItem('token'); localStorage.removeItem('role'); }
}


