import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/products';

  readonly products = signal<IProduct[]>([]);

  readonly selectedProduct = signal<IProduct | null>(null);

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

          this.loading.set(false);

        },

        error: err => {

          this.error.set(err.message);

          this.loading.set(false);

        }

      });

  }

}