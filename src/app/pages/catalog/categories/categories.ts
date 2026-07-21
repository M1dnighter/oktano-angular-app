import { Component, input } from '@angular/core';
import { ICategory } from '../../../services/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  category = input.required<ICategory>();


}
