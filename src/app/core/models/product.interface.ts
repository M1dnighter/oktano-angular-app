export interface IProduct {
  id: number;
  categoryId: number;
  name: string;
  image: string;
  description: string;
  composition: string[];
  price: number;
  full_composition: string;
  weight: string;
}

export interface IIngredient {
  id: number;
  ingredients: string[];
  image: string;
  weight: string;
  price: number;
}