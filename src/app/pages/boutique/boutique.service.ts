import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoutiqueService {
  private readonly API_URL = 'http://localhost:5000/boutique';

  constructor(private http: HttpClient) {}

  getAll(filters: any = {}): Observable<any> {
    let params = '';
    if (filters.idCategorie) params += `idCategorie=${filters.idCategorie}&`;
    if (filters.etage) params += `etage=${filters.etage}&`;
    if (filters.status !== undefined) params += `status=${filters.status}&`;
    return this.http.get(`${this.API_URL}/?${params}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/new`, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  desactiver(id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/desactiver/${id}`, {});
  }

  uploadImage(formData: FormData) {
    return this.http.post<{url: string}>(`${this.API_URL}/upload`, formData);
  }
}
