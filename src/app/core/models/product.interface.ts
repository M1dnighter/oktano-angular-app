export interface IProduct {
  id: number;
  categoryId: number;
  name: string;
  image: string;
  description: string;
  ingredientIds: number[];
  composition: string[];
  price: number;
  full_composition: string;
  weight: string;
}

export interface IIngredient {
  id: number;
  name: string;
  image: string;
  price: number;
  weight: string;
}