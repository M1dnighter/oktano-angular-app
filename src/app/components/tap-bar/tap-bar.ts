import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tap-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tap-bar.html',
  styleUrl: './tap-bar.scss',
})
export class TapBar {}
