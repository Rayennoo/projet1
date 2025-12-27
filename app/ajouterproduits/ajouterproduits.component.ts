import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProduitService } from '../services/api.service';
import { ProduitModel } from '../models/prodouit.model';

import Swal from "sweetalert2"

@Component({
  selector: 'app-ajouterproduits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './ajouterproduits.component.html',
  styleUrls: ['./ajouterproduits.component.css']
})
export class AjouterproduitsComponent implements OnInit {
  formValue !: FormGroup;
  produitModelObj: ProduitModel = new ProduitModel();
  currentMaxId: number = 0;
  messageSucces: string = '';
  messageErreur: string = '';
  showMessageModal = false;
  private messageTimer: any;
constructor(private formbuilder: FormBuilder,private api: ProduitService,private router: Router
  ) {}
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nom: [''],
      description: [''],
      prix: [''],
      quantite: [''],
      imageUrl: [''],
      categorie: ['']
    });
  }
   categories: string[] = [
    'outils coiffure',
    'cheveux',
    'barbe',
    'visage',
  ];

  ajouterProduit(): void {
    this.produitModelObj.nom = this.formValue.value.nom;
    this.produitModelObj.description = this.formValue.value.description;
    this.produitModelObj.prix = this.formValue.value.prix;
    this.produitModelObj.quantite = this.formValue.value.quantite;
    this.produitModelObj.imageUrl = this.formValue.value.imageUrl;
    this.produitModelObj.categorie = this.formValue.value.categorie;
    this.produitModelObj.id = ++this.currentMaxId;
    const produitToSend: ProduitModel = {
      nom: this.produitModelObj.nom,
      description: this.produitModelObj.description,
      prix: this.produitModelObj.prix,
      quantite: this.produitModelObj.quantite,
      imageUrl: this.produitModelObj.imageUrl,
      categorie: this.produitModelObj.categorie
    };
    this.api.ajouterProduit(produitToSend).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Produit ajouté avec succès ! ✓',
          timer: 3000,
          showConfirmButton: false
        });
        this.formValue.reset();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l\'ajout du produit'
        });
      }
    });
  }

  closeMessageModal(): void {
    this.showMessageModal = false;
    this.messageSucces = '';
    this.messageErreur = '';
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }
  }

  setAutoCloseTimer(): void {
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }
    this.messageTimer = setTimeout(() => {
      this.closeMessageModal();
    }, 3000);
  }

  annuler(): void {
    this.closeMessageModal();
    this.router.navigate(['/home']);
  }
}