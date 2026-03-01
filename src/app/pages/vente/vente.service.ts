import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VenteService {
  private readonly API = 'http://localhost:5000/vente';
  constructor(private http: HttpClient) {}
  getAll(idBoutique?: string): Observable<any> {
    return this.http.get(`${this.API}/${idBoutique ? '?idBoutique=' + idBoutique : ''}`);
  }
  getById(id: string): Observable<any> { return this.http.get(`${this.API}/${id}`); }
  create(data: any): Observable<any> { return this.http.post(`${this.API}/new`, data); }
  annuler(id: string): Observable<any> { return this.http.patch(`${this.API}/annuler/${id}`, {}); }
  getStats(): Observable<any> { return this.http.get(`${this.API}/stats`); }
}
