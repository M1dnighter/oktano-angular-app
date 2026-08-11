import { computed, inject, Injectable, signal } from '@angular/core';
import { IUser } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);
  private readonly userUrl = 'http://localhost:3000/users';

  readonly user = signal<IUser | null>(null);

  readonly isAuthorized = computed(() =>
    this.user() !== null
  );

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // loadUser(phone: string): void {

  //   this.loading.set(true);
  //   this.error.set(null);

  //   this.http
  //     .get<IUser[]>(`${this.userUrl}?phone=${phone}`)
  //     .subscribe({

  //       next: users => {

  //         console.log('Users:', users);

  //         if (users.length === 0) {

  //           this.user.set(null);
  //           this.error.set('Пользователь не найден');

  //         } else {

  //           this.user.set(users[0]);

  //         }

  //         this.loading.set(false);

  //       },

  //       error: err => {

  //         this.error.set(err.message);
  //         this.loading.set(false);

  //       }

  //     });

  // }
  loadUser(phone: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<IUser[]>(this.userUrl)
      .subscribe({
        next: users => {
          console.log('All users:', users);

          const user = users.find(
            user => user.phone === phone
          );

          console.log('Found user:', user);

          if (user) {
            this.user.set(user);
          } else {
            this.user.set(null);
            this.error.set('Пользователь не найден');
          }

          this.loading.set(false);
        },

        error: err => {
          console.error(err);

          this.error.set(err.message);
          this.loading.set(false);
        }
      });
  }

  logout(): void {
    this.user.set(null);
  }

}