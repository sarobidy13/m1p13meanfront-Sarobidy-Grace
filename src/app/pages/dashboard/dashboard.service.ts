// services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
 
  // private readonly API = 'http://localhost:5000';
  private readonly API = ' https://m1p13meanback-sarobidy-grace.onrender.com';
  constructor(private http: HttpClient) {}

  // private getHeaders() {
  //   return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
  // }

  getTopBoutiques(): Observable<any> {
    return this.http.get(`${this.API}/boutique/top`);
  }

  getTotalBoutiques(): Observable<any> {
    return this.http.get(`${this.API}/boutique/total`);
  }

  getDerniersLoyers(): Observable<any> {
    return this.http.get(`${this.API}/loyer/dernier`);
  }

  getTotalContratsActifs(): Observable<any> {
    return this.http.get(`${this.API}/contrat/totalActif`);
  }

  getRevenuMensuel(): Observable<any> {
    return this.http.get(`${this.API}/loyer/revenu/mensuel`);
  }
}