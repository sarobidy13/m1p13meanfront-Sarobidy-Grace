import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = Number(localStorage.getItem('role'));
    const allowedRoles: number[] = route.data['roles'];

    if (!role) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      // Rediriger selon le rôle
      if (role === 1) this.router.navigate(['/pages/boutique']);
      else if (role === 2) this.router.navigate(['/pages/article']);
      else this.router.navigate(['/boutiques']);
      return false;
    }

    return true;
  }
}
