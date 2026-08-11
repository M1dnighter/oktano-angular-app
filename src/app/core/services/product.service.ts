import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { IIngredient, IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/products';
  private readonly ingredientsUrl = 'http://localhost:3000/ingredients';

  readonly products = signal<IProduct[]>([]);
  readonly ingredients = signal<IIngredient[]>([]);

  readonly selectedProduct = signal<IProduct | null>(null);
  readonly selectedIngredients = signal<IIngredient[]>([]);
  
  readonly totalPrice = computed(() => {
    const product = this.selectedProduct();

    if(!product){
      return 0;
    }

    const ingredientsPrice = this.selectedIngredients()
      .reduce((sum, ingredient) => sum + ingredient.price, 0);

    return product.price + ingredientsPrice;
  })

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadProducts(categoryId: number) {

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<IProduct[]>(`${this.apiUrl}?categoryId=${categoryId}`)
      .subscribe({

        next: products => {

          this.products.set(products);

          this.loading.set(false);

        },

        error: err => {

          this.error.set(err.message);

          this.loading.set(false);

        }

      });

  }

  loadProduct(productId: number) {

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<IProduct>(`${this.apiUrl}/${productId}`)
      .subscribe({

        next: product => {

          this.selectedProduct.set(product);

          if (product.ingredientIds?.length) {
            this.loadIngredients(product.ingredientIds);
          } else {
            this.ingredients.set([]);
            this.loading.set(false);
          }

        },

        error: err => {

          this.error.set(err.message);

          this.loading.set(false);

        }

      });

  }

  loadIngredients(ids: number[]): void {

    this.http
      .get<IIngredient[]>(this.ingredientsUrl)
      .subscribe({

        next: ingredients => {

          const normalized = ingredients.map(ingredient => ({
            ...ingredient,
            id: Number(ingredient.id)
          }));

          const filteredIngredients = normalized.filter(ingredient =>
            ids.includes(ingredient.id)
          );

          this.ingredients.set(filteredIngredients);
          this.loading.set(false);

        },

        error: err => {

          this.error.set(err.message);
          this.loading.set(false);

        }

      });

  }

  toggleIngredient(ingredient: IIngredient): void {

    const selected = this.selectedIngredients();

    const exists = selected.some(i => i.id === ingredient.id);

    if (exists) {
      this.selectedIngredients.set(
        selected.filter(i => i.id !== ingredient.id)
      );
    } else {
      this.selectedIngredients.set([
        ...selected,
        ingredient
      ]);
    }

  }

}