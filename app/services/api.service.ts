import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProduitModel } from '../models/prodouit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  constructor(private http: HttpClient) { }

  ajouterProduit(data: any) {
    return this.http.post<any>("http://localhost:3000/produits", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getProduits() {
    return this.http.get<any>("http://localhost:3000/produits")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getProduitById(id: number | string) {
    return this.http.get<any>(`http://localhost:3000/produits/${id}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  modifierProduit(id: number | string, data: any) {
    return this.http.patch<any>(`http://localhost:3000/produits/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  supprimerProduit(id: number | string) {
    return this.http.delete<any>(`http://localhost:3000/produits/${id}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}