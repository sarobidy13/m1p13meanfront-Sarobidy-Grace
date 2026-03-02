import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContratService {
  // https://m1p13meanback-sarobidy-grace.onrender.com

  // private readonly API_URL = 'http://localhost:5000/contrat';
  private readonly API_URL = 'https://m1p13meanback-sarobidy-grace.onrender.com/contrat';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> { return this.http.get(`${this.API_URL}/`); }
  getById(id: string): Observable<any> { return this.http.get(`${this.API_URL}/${id}`); }
  create(data: any): Observable<any> { return this.http.post(`${this.API_URL}/new`, data); }
  update(id: string, data: any): Observable<any> { return this.http.put(`${this.API_URL}/${id}`, data); }
  resilier(id: string): Observable<any> { return this.http.patch(`${this.API_URL}/resilier/${id}`, {}); }
}
