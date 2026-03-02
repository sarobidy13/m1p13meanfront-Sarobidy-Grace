import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // private readonly API_URL = 'http://localhost:5000';
  private readonly API_URL ='https://m1p13meanback-sarobidy-grace.onrender.com';
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, mdp: string): Observable<any> {
    return this.http.post(`${this.API_URL}/user/login`, { email, mdp }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }),
      catchError((err) => {
        const message = err.error?.message || 'Erreur de connexion';
        return throwError(() => new Error(message));
      })
    );
  }

  register(data: any): Observable<any> {
    const payload = {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      mdp: data.password,
      tel: Number(data.phone),
      role: this.getRoleNumber(data.role),
    };
    return this.http.post(`${this.API_URL}/user/new`, payload).pipe(
      catchError((err) => {
        const message = err.error?.error || "Erreur lors de l'inscription";
        return throwError(() => new Error(message));
      })
    );
  }

  private getRoleNumber(role: string): number {
    switch (role) {
      case 'admin': return 1;
      case 'gerant-boutique': return 2;
      case 'client': return 3;
      default: return 3;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
