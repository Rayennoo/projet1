import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanierItem } from '../models/panier.model';
import { ProduitModel } from '../models/prodouit.model';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private readonly storageKey = 'panier_items';
  private readonly itemsSubject = new BehaviorSubject<PanierItem[]>(this.loadFromStorage());
  readonly items$ = this.itemsSubject.asObservable();

  addItem(product: ProduitModel): void {
    const items = [...this.itemsSubject.value];
    const productId = this.getProductId(product);
    const existing = items.find((i) => this.getProductId(i.product) === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }

    this.update(items);
  }

  removeItem(productId: number | string): void {
    const items = this.itemsSubject.value.filter((i) => this.getProductId(i.product) !== productId);
    this.update(items);
  }

  clear(): void {
    this.update([]);
  }

  getItemsSnapshot(): PanierItem[] {
    return this.itemsSubject.value;
  }

  getTotal(): number {
    return this.itemsSubject.value.reduce((sum, item) => sum + item.product.prix * item.quantity, 0);
  }

  private update(items: PanierItem[]): void {
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  private loadFromStorage(): PanierItem[] {
    try {
      if (typeof localStorage === 'undefined') {
        return [];
      }
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return [];
      }
      return JSON.parse(raw) as PanierItem[];
    } catch (err) {
      console.error('Failed to load cart from storage', err);
      return [];
    }
  }

  private saveToStorage(items: PanierItem[]): void {
    try {
      if (typeof localStorage === 'undefined') {
        return;
      }
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to storage', err);
    }
  }

  private getProductId(product: ProduitModel): number | string | undefined {
    return product.id ?? (product as any).productid;
  }
}
