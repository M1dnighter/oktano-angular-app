import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryCard } from '../../../components/category-card/category-card';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CategoryCard],
  templateUrl: './category-menu.html',
  styleUrl: './category-menu.scss',
})
export class CategoryMenu implements OnInit{
  
  private route = inject(ActivatedRoute);
  
  readonly categories = inject(CategoryService);
  readonly products = inject(ProductService);
  
  readonly category = this.categories.selectedCategory;

  ngOnInit(): void {

    if (this.categories.categories().length === 0) {
      this.categories.loadCategories();
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.categories.selectedCategoryId.set(id);

    this.products.loadProducts(id);
  }
}
