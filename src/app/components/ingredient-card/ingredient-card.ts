import { Component, computed, inject, input } from '@angular/core';
import { IIngredient } from '../../core/models/product.interface';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-ingredient-card',
  standalone: true,
  imports: [],
  templateUrl: './ingredient-card.html',
  styleUrl: './ingredient-card.scss',
})
export class IngredientCard {

  ingredient = input.required<IIngredient>();

  private readonly productService = inject(ProductService);

  readonly selected = computed(() =>
    this.productService
      .selectedIngredients()
      .some(item => item.id === this.ingredient().id));

  onClick() {
    this.productService.toggleIngredient(this.ingredient());
  }
}
