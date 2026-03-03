import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
  const roleStr = localStorage.getItem('role');
  
  // Pas connecté
  if (!roleStr) {
    this.router.navigate(['/auth/login']);
    return false;
  }

  const role = Number(roleStr);
  const allowedRoles: number[] = route.data['roles'];


  // Pas de restriction de rôle sur cette route
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  // Rôle non autorisé
  if (!allowedRoles.includes(role)) {
    if (role === 1) this.router.navigate(['/pages/boutique']);
    else if (role === 2) this.router.navigate(['/pages/article']);
    else this.router.navigate(['/auth/login']);
    return false;
  }

  return true;
}
}
