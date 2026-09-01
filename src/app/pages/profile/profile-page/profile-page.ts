import { Component, inject, OnInit } from '@angular/core';
import { TapBar } from '../../../components/tap-bar/tap-bar';
import { UserService } from '../../../core/services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [TapBar, RouterModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage{

  readonly userService = inject(UserService);

  //   ngOnInit(): void {
  //     this.userService.loadUser('+79991234567');
  // }
}
