import { Component, inject, input, OnInit } from '@angular/core';
import { Categories } from '../categories/categories';
import { CategoryService } from '../../../core/services/category.service';
import { TapBar } from '../../../components/tap-bar/tap-bar';


@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [Categories, TapBar],
  templateUrl: './result-page.html',
  styleUrl: './result-page.scss',
})
export class ResultPage implements OnInit{

  readonly categories = inject(CategoryService);

  ngOnInit(): void {
    this.categories.loadCategories();
  }
}
