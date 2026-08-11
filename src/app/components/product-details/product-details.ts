import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IIngredient, IProduct } from '../../core/models/product.interface';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, IngredientCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  product = input.required<IProduct>();
  ingredients = input<IIngredient[]>([]);
  readonly productService = inject(ProductService);
}
