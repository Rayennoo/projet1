import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitModel } from '../models/prodouit.model';
import { ProduitService } from '../services/api.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProducts: ProduitModel[] = [];
  latestProducts: ProduitModel[] = [];
  isLoading = true;
  error: string | null = null;
  selectedCategory = '';
  selectedProduct: ProduitModel | null = null;
  showAll = false;

  constructor(
    private productService: ProduitService,
    private route: ActivatedRoute,
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category') || '';
      this.applyFilter();
    });
    this.loadLatestProducts();
  }

  loadLatestProducts(): void {
    this.isLoading = true;
    this.productService.getProduits().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  applyFilter(): void {
    const base = this.selectedCategory
      ? this.allProducts.filter(p => p.categorie === this.selectedCategory)
      : this.allProducts;
    this.latestProducts = this.showAll ? base.slice().reverse() : base.slice(-18).reverse();
  }

  addToCart(product: ProduitModel, event?: Event): void {
    // Stop the card click from opening the modal when clicking the button
    event?.stopPropagation();
    this.panierService.addItem(product);
  }

  scrollToLatest(): void {
    const el = document.getElementById('latest-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openProductModal(product: ProduitModel): void {
    this.selectedProduct = product;
  }

  closeProductModal(): void {
    this.selectedProduct = null;
  }

  viewAllProducts(): void {
    this.showAll = true;
    this.applyFilter();
  
  }

  showLessProducts(): void {
    this.showAll = false;
    this.applyFilter();
    this.scrollToLatest();
  }

  isNewProduct(product: ProduitModel): boolean {
    const base = this.selectedCategory
      ? this.allProducts.filter(p => p.categorie === this.selectedCategory)
      : this.allProducts;
    const latest18 = base.slice(-18);
    return latest18.some(p => p.id === product.id);
    this.applyFilter();
  }
}