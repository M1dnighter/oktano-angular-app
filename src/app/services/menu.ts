import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';

export interface ICategory {
    "id": number,
    "name": string,
    "image": string
}

export interface IProduct {
    "id": number,
    "categoryId": number,
    "name": string,
    "image": string,
    "description": string,
    "composition": string[],
    "price": number,
    "full_composition": string,
    "weight": string
}

export interface IIngredients extends IProduct {
    "id": number,
    "ingredients": string[],
    "image": string,
    "weight": string
}

@Injectable({
    providedIn: 'root'
})

export class Menu {
    private apiUrl = 'http://localhost:3000/categories';

    readonly categories = signal<ICategory[]>([]);
    readonly products = signal<IProduct[]>([]);

    readonly load = signal(false);
    readonly error = signal<string | null>(null);

    readonly selectedCategoryId = signal<number | null>(null);
    readonly selectedCategory = computed(() =>
        this.categories().find(
            category => category.id === this.selectedCategoryId()
        )
    );

    constructor(private http: HttpClient) { }

    loadCategories(){
        this.load.set(true);
        this.error.set(null);

        this.http.get<ICategory[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.categories.set(data.map(category => ({
                    ...category,
                    id: Number(category.id)
                }))
                );
                this.load.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.load.set(false);
            }
        });
    }

    loadProducts(categoryId: number){
        this.http.get<IProduct[]>(`http://localhost:3000/products?categoryId=${categoryId}`).subscribe({
            next: (data) => {
                this.products.set(data)
                this.load.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.load.set(false);
            }
        });
    }
}
