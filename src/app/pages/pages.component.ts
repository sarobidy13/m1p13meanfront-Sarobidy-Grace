import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_ADMIN, MENU_GERANT } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const role = Number(localStorage.getItem('role'));
    if (role === 1) {
      this.menu = MENU_ADMIN;
    } else if (role === 2) {
      this.menu = MENU_GERANT;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
