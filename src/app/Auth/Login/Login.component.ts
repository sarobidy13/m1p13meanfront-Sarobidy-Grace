import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ChangeDetectorRef, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {
  constructor(
    authService: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    private myRouter: Router,
  ) {
    super(authService, options, cd, myRouter);
  }

  login(): void {
    console.log('login called');
    const email = (this as any).user?.email;
    const mdp = (this as any).user?.password;
    console.log('Email:', email, 'Mdp:', mdp);

    if (!email || !mdp) {
      this.errors = ['Veuillez remplir tous les champs'];
      this.submitted = false;
      this.cd.detectChanges();
      return;
    }

    fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, mdp }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Response backend:', data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', String(data.role));
          localStorage.setItem('idBoutique', data.idBoutique || '');
          localStorage.setItem('nomBoutique', data.nomBoutique || '');
          localStorage.setItem('user', JSON.stringify(data.user));

          const role = Number(data.role);
          console.log('Role:', role);

          if (role === 1) {
            this.myRouter.navigate(['/pages/boutique']);
          } else if (role === 2) {
            this.myRouter.navigate(['/pages/article']);
          } else {
            this.myRouter.navigate(['/boutiques']);
          }
        } else {
          this.errors = [data.message || 'Erreur de connexion'];
          this.submitted = false;
          this.cd.detectChanges();
        }
      })
      .catch((err) => {
        console.log('Erreur fetch:', err);
        this.errors = ['Erreur serveur'];
        this.submitted = false;
        this.cd.detectChanges();
      });
  }
}
