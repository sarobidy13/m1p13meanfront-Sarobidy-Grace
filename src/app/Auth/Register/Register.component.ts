import { Component, ChangeDetectorRef } from '@angular/core';
import { NbRegisterComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
})
export class RegisterComponent extends NbRegisterComponent {
  override user: any = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
  };

  // ← initialisation explicite pour éviter "undefined"
  override showMessages: any = { error: false, success: false };
  override errors: string[] = [];
  override messages: string[] = [];
  override submitted: boolean = false;

  constructor(
    private authService: AuthService,
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
  ) {
    super(service, {}, cd, router);
  }

  override register(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.showMessages = { error: true, success: false };
      this.errors = ['Les mots de passe ne correspondent pas'];
      return;
    }

    this.submitted = true;
    this.errors = [];
    this.messages = [];
    this.showMessages = { error: false, success: false };

    this.authService.register(this.user).subscribe({
      next: () => {
        this.submitted = false;
        this.showMessages = { error: false, success: true };
        this.messages = ['Inscription réussie ! Redirection...'];
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.submitted = false;
        this.showMessages = { error: true, success: false };
        this.errors = [err.message || "Erreur lors de l'inscription"];
      },
    });
  }

  override getConfigValue(key: string): any {
    const config: Record<string, any> = {
      'forms.validation.fullName.required': true,
      'forms.validation.fullName.minLength': 2,
      'forms.validation.fullName.maxLength': 50,
      'forms.validation.email.required': true,
      'forms.validation.password.required': true,
      'forms.validation.password.minLength': 6,
      'forms.validation.password.maxLength': 50,
      'forms.register.terms': false,
    };
    return config[key];
  }
}
