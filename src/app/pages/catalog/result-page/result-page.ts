import { Component, inject, input, OnInit } from '@angular/core';
import { Address } from '../address/address';
import { Categories } from '../categories/categories';
import { Menu } from '../../../services/menu';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [Categories],
  templateUrl: './result-page.html',
  styleUrl: './result-page.scss',
})
export class ResultPage implements OnInit{

  readonly menu = inject(Menu);

  ngOnInit(): void {
    this.menu.loadCategories();
  }
}
