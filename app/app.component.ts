import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProduitService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'homme coiffure';
  categories: string[] = [];
  catError: string = '';
  showCategories: boolean = false;
totalItems: any;
cartItemCount: any;

  constructor(private api: ProduitService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.api.getProduits()
      .subscribe({
        next: (res) => {
          this.categories = this.extractUniqueCategories(res);
          if (this.categories.length === 0) {
            this.catError = 'Aucune catégorie trouvée';
          }
        },
        error: (err) => {
          console.log(err);
          this.catError = 'Catégories indisponibles';
        }
      });
  }

  extractUniqueCategories(produits: any): string[] {
    let uniqueCategories: string[] = [];
    for (let i = 0; i < produits.length; i++) {
      let categorie = produits[i].categorie;
      let exists = false;
      for (let j = 0; j < uniqueCategories.length; j++) {
        if (uniqueCategories[j] === categorie) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        uniqueCategories.push(categorie);
      }
    }
    return uniqueCategories;
  }

  onCategorySelect(category: string): void {
    this.router.navigate(['/home'], {
      queryParams: { category: category || null }
    });
    this.showCategories = false;
  }

  toggleCategoriesMenu(): void {
    this.showCategories = !this.showCategories;
  }

  closeCategories(): void {
    this.showCategories = false;
  }
}
