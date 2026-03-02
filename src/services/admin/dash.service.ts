import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  private apiUrl = 'http://localhost:5000/loyer';

  constructor(private http: HttpClient) {}

  getDerniersLoyersPaies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/derniers-payes`);
  }
}