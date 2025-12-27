import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from '../services/api.service';
import { ProduitModel } from '../models/prodouit.model';

import Swal from "sweetalert2"
@Component({
  selector: 'app-gestionproduits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestionproduits.component.html',
  styleUrl: './gestionproduits.component.css'
})
export class GestionproduitsComponent implements OnInit {
  formValue !: FormGroup;
  produits: ProduitModel[] = [];
  produitModelObj: ProduitModel = new ProduitModel();

  constructor(
    private formbuilder: FormBuilder,
    private api: ProduitService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nom: [''],
      description: [''],
      prix: [''],
      quantite: [''],
      imageUrl: [''],
      categorie: ['']
    });
    this.getAllProduits();
  }

  getAllProduits(): void {
    this.api.getProduits().subscribe({
      next: (res) => {
        this.produits = res;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Quelque chose s'est mal passé lors du chargement des produits"
        });
      }
    });
  }

  deleteProduit(row: any): void {
    this.api.supprimerProduit(row.id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Produit supprimé'
        });
        this.getAllProduits();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Quelque chose s'est mal passé lors de la suppression"
        });
      }
    });
  }

  onEdit(row: any): void {
    this.produitModelObj.id = row.id;
    this.formValue.controls['nom'].setValue(row.nom);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['prix'].setValue(row.prix);
    this.formValue.controls['quantite'].setValue(row.quantite);
    this.formValue.controls['imageUrl'].setValue(row.imageUrl);
    this.formValue.controls['categorie'].setValue(row.categorie);
  }

  updateProduitDetails(): void {
    this.produitModelObj.nom = this.formValue.value.nom;
    this.produitModelObj.description = this.formValue.value.description;
    this.produitModelObj.prix = this.formValue.value.prix;
    this.produitModelObj.quantite = this.formValue.value.quantite;
    this.produitModelObj.imageUrl = this.formValue.value.imageUrl;
    this.produitModelObj.categorie = this.formValue.value.categorie;
    this.api.modifierProduit(this.produitModelObj.id!, this.produitModelObj).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Mise à jour réussie'
        });
        this.formValue.reset();
        this.produitModelObj.id = undefined;
        this.getAllProduits();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Quelque chose s'est mal passé lors de la mise à jour"
        });
      }
    });
  }

  cancelEdit(): void {
    this.produitModelObj.id = undefined;
    this.formValue.reset();
  }
}
