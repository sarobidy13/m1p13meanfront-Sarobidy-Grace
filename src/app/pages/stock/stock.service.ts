import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly API_ARTICLE = 'https://m1p13meanback-sarobidy-grace.onrender.com/article';

  constructor(private http: HttpClient) {}

  getArticlesByBoutique(idBoutique: string): Observable<any> {
    return this.http.get(`${this.API_ARTICLE}/?idBoutique=${idBoutique}`);
  }
  getArticlesEnAlerte(idBoutique: string): Observable<any> {
    return this.http.get(`${this.API_ARTICLE}/en-alerte?idBoutique=${idBoutique}`);
  }
  getMouvementsByArticle(idArticle: string): Observable<any> {
    return this.http.get(`${this.API_ARTICLE}/mouvements/${idArticle}`);
  }
  getAllMouvements(): Observable<any> {
    return this.http.get(`${this.API_ARTICLE}/mouvements`);
  }
  entreeStock(idArticle: string, quantite: number, motif: string): Observable<any> {
    return this.http.patch(`${this.API_ARTICLE}/entree/${idArticle}`, { quantite, motif });
  }
}
