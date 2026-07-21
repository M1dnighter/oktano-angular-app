import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../../services/menu';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [],
  templateUrl: './category-menu.html',
  styleUrl: './category-menu.scss',
})
export class CategoryMenu implements OnInit{
  
  private route = inject(ActivatedRoute);
  readonly menu = inject(Menu);
  
  readonly category = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    return this.menu.categories().find(c => c.id === id);
  });

  ngOnInit(): void {

    if (this.menu.categories().length === 0) {
      this.menu.loadCategories();
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.menu.selectedCategoryId.set(id);

    this.menu.loadProducts(id);
  }
}
