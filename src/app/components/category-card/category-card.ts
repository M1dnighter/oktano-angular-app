import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../core/models/product.interface';

@Component({
  selector: 'app-category-card',
  imports: [RouterModule],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {

  product = input.required<IProduct>();
}
