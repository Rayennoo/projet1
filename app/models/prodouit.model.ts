export class ProduitModel {
  id?: number | string;
  nom: string = '';
  description: string = '';
  prix: number = 0;
  quantite: number = 0;
  imageUrl: string = '';
  categorie: string = '';
}