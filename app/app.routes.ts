import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AjouterproduitsComponent } from './ajouterproduits/ajouterproduits.component';
import { GestionproduitsComponent } from './gestionproduits/gestionproduits.component';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gestion-produits',
    pathMatch: 'full'
  },
  {
    path: 'gestion-produits',
    component: GestionproduitsComponent
  },
  {
    path: 'ajout-produit',
    component: AjouterproduitsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'panier',
    component: PanierComponent
  }
];