import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetails } from '../../../components/product-details/product-details';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductDetails],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {

  private route = inject(ActivatedRoute);

  readonly productService = inject(ProductService);

  readonly product = this.productService.selectedProduct;
  readonly ingredients = this.productService.ingredients;

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.loadProduct(id);

  }
}
