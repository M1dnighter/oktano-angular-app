import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { ICategory } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/categories';

  readonly categories = signal<ICategory[]>([]);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly selectedCategoryId = signal<number | null>(null);

  readonly selectedCategory = computed(() =>
    this.categories().find(
      category => category.id === this.selectedCategoryId()
    )
  );

  loadCategories() {

    this.loading.set(true);
    this.error.set(null);

    this.http.get<ICategory[]>(this.apiUrl).subscribe({

      next: (categories) => {

        this.categories.set(
          categories.map(category => ({
            ...category,
            id: Number(category.id)
          }))
        );

        this.loading.set(false);

      },

      error: err => {

        this.error.set(err.message);

        this.loading.set(false);

      }

    });

  }

}