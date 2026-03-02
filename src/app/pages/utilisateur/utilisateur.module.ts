import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,    // ← présent ?
  NbAlertModule,
  NbSpinnerModule,
  NbSelectModule,  // ← présent ?
} from '@nebular/theme';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { ListeUtilisateurComponent } from './liste-utilisateur/liste-utilisateur.component';
import { FormUtilisateurComponent } from './form-utilisateur/form-utilisateur.component';

@NgModule({
  declarations: [
    ListeUtilisateurComponent,
    FormUtilisateurComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,    // ← ajouté
    NbAlertModule,
    NbSpinnerModule,
    NbSelectModule,  // ← ajouté
    UtilisateurRoutingModule,
  ],
})
export class UtilisateurModule {}