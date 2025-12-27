import { ProduitModel } from './prodouit.model';

export interface PanierItem {
  product: ProduitModel;
  quantity: number;
}