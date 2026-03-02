import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorieBoutiqueService {
  // private readonly API_URL = 'http://localhost:5000/categorieBoutique';
  private readonly API_URL = 'https://m1p13meanback-sarobidy-grace.onrender.com/categorieBoutique';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.API_URL}/`);
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
}
