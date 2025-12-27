import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PanierItem } from '../models/panier.model';
import { ProduitModel } from '../models/prodouit.model';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {
  items: PanierItem[] = [];
  total = 0;
  private sub?: Subscription;

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.sub = this.panierService.items$.subscribe((items) => {
      this.items = items;
      this.total = this.panierService.getTotal();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  remove(product: ProduitModel): void {
    const productId = this.getProductId(product);
    if (productId !== undefined) {
      this.panierService.removeItem(productId);
    }
  }

  clearCart(): void {
    this.panierService.clear();
  }

  trackByProduct = (_: number, item: PanierItem) => this.getProductId(item.product);

  private getProductId(product: ProduitModel): number | string | undefined {
    return product.id ?? (product as any).productid;
  }
}
