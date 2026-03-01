import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { BoutiquesComponent } from './boutiques/boutiques.component';
import { BoutiqueDetailComponent } from './boutique-detail/boutique-detail.component';
import { PanierComponent } from './panier/panier.component';

@NgModule({
  declarations: [BoutiquesComponent, BoutiqueDetailComponent, PanierComponent],
  imports: [CommonModule, FormsModule, ClientRoutingModule],
})
export class ClientModule {}
