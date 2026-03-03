import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly API = 'https://m1p13meanback-sarobidy-grace.onrender.com/article';
  constructor(private http: HttpClient) {}
  getAll(idBoutique?: string): Observable<any> {
    return this.http.get(`${this.API}/${idBoutique ? '?idBoutique=' + idBoutique : ''}`);
  }
  getById(id: string): Observable<any> { return this.http.get(`${this.API}/${id}`); }
  create(data: any): Observable<any> { return this.http.post(`${this.API}/new`, data); }
  update(id: string, data: any): Observable<any> { return this.http.put(`${this.API}/${id}`, data); }
  desactiver(id: string): Observable<any> { return this.http.patch(`${this.API}/desactiver/${id}`, {}); }
  entreeStock(id: string, quantite: number, motif: string): Observable<any> {
    return this.http.patch(`${this.API}/entree/${id}`, { quantite, motif });
  }
  getMouvements(id: string): Observable<any> { return this.http.get(`${this.API}/mouvements/${id}`); }
  getHistoriquePrix(id: string): Observable<any> { return this.http.get(`${this.API}/historique-prix/${id}`); }
  uploadImage(formData: FormData) {
    return this.http.post<{url: string}>(`${this.API}/upload`, formData);
  }
}
