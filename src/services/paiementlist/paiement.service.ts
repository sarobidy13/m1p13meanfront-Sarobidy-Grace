import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaiementService {

  private url = `${environment}/paiements`;

  constructor(private http: HttpClient) {}

  getAll(filter?: { status?: string, idVente?: string }): Observable<any> {
    return this.http.get(this.url, { params: { ...filter } });
  }

  initier(data: any): Observable<any> {
    return this.http.post(`${this.url}/initier`, data);
  }

  confirmer(id: string): Observable<any> {
    return this.http.put(`${this.url}/${id}/confirmer`, {});
  }

  rejeter(id: string, note: string): Observable<any> {
    return this.http.put(`${this.url}/${id}/rejeter`, { note });
  }

  getByVente(idVente: string): Observable<any> {
    return this.http.get(`${this.url}/vente/${idVente}`);
  }
}