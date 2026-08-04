import { Component, inject, input, OnInit } from '@angular/core';
import { Categories } from '../categories/categories';
import { CategoryService } from '../../../core/services/category.service';


@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [Categories],
  templateUrl: './result-page.html',
  styleUrl: './result-page.scss',
})
export class ResultPage implements OnInit{

  readonly categories = inject(CategoryService);

  ngOnInit(): void {
    this.categories.loadCategories();
  }
}
