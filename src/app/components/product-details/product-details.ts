import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../core/models/product.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  product = input.required<IProduct>();
}
