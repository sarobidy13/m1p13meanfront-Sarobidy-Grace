// services/paiement-mode.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PaiementModeDetails {
  nomReseau?:       string;
  numeroTelephone?: string;
  nomTitulaire?:    string;
  rib?:             string;
  numeroCarte?:     string;
}

export interface PaiementMode {
  _id?:           string;
  idBoutique:     string;
  type:           'espece' | 'mobile_money' | 'virement' | 'carte';
  details:        PaiementModeDetails;
  estPrincipal?:  boolean;
  status?:        boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaiementModeService {

  private url = `${environment}/paiement-modes`;

  constructor(private http: HttpClient) {}

  add(data: PaiementMode): Observable<any> {
    return this.http.post(this.url, data);
  }

  getByBoutique(idBoutique: string): Observable<any> {
    return this.http.get(`${this.url}/boutique/${idBoutique}`);
  }

  update(id: string, data: Partial<PaiementMode>): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}