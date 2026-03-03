import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoyerService {
  private readonly API_URL = 'https://m1p13meanback-sarobidy-grace.onrender.com/loyer';

  constructor(private http: HttpClient) {}

  getAll(status?: string): Observable<any> {
    const params = status ? `?status=${status}` : '';
    return this.http.get(`${this.API_URL}/${params}`);
  }
  getByContrat(idContrat: string): Observable<any> { return this.http.get(`${this.API_URL}/contrat/${idContrat}`); }
  payer(id: string): Observable<any> { return this.http.patch(`${this.API_URL}/payer/${id}`, {}); }
  getEnRetard(): Observable<any> { return this.http.get(`${this.API_URL}/en-retard`); }
  getDashboard(): Observable<any> { return this.http.get(`${this.API_URL}/dashboard`); }
}
