import { Component, ElementRef, OnDestroy, QueryList, signal, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnDestroy{

  readonly step = signal(1);

  readonly userPhone = signal('');

  readonly verificationCode = signal('');

  readonly codeInputs = signal<string[]>(['', '', '', '']);

  readonly timer = signal(30);

  readonly canRequestNewCode = signal(false);

  readonly codeError = signal(false);

  readonly isPhoneValid = signal(false);

  private timerId?: ReturnType<typeof setInterval>;

  @ViewChildren('codeInput')
  private codeInputElements!: QueryList<ElementRef<HTMLInputElement>>;

  nextStep(): void {

    if (this.step() === 1) {

      if (!this.isPhoneValid()) {
        return;
      }

      this.generateCode();

      this.step.set(2);

      this.startTimer();

      return;
    }

    if (this.step() === 2) {

      this.checkCode();

      return;
    }

    if (this.step() === 3) {

      this.step.set(4);
    }
  }

  onPhoneInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('9')) {
      value = `7${value}`;
    }

    value = value.slice(0, 11);

    this.userPhone.set(value);

    this.isPhoneValid.set(value.length === 11);
  }

  onCodeInput(event: Event, index: number): void {

    const input = event.target as HTMLInputElement;

    const value = input.value.replace(/\D/g, '').slice(-1);

    this.codeError.set(false);

    const code = [...this.codeInputs()];

    code[index] = value;

    this.codeInputs.set(code);

    if (value && index < 3) {

      const nextInput =
        this.codeInputElements.get(index + 1);

      nextInput?.nativeElement.focus();
    }

    if (index === 3 && value) {

      this.checkCode();
    }
  }

  onCodeKeydown(event: KeyboardEvent, index: number): void {
    if (
      event.key === 'Backspace' &&
      !this.codeInputs()[index] &&
      index > 0
    ) {

      const previousInput =
        this.codeInputElements.get(index - 1);

      previousInput?.nativeElement.focus();
    }
  }

  checkCode(): void {

    const enteredCode = this.codeInputs().join('');

    if (enteredCode.length !== 4) {
      return;
    }

    if (enteredCode === this.verificationCode()) {

      console.log('Код верный');

      this.codeError.set(false);

      this.stopTimer();

      this.step.set(3);

    } else {

      console.log('Неверный код');

      this.codeError.set(true);

      this.codeInputs.set(['', '', '', '']);

      this.codeInputElements.first?.nativeElement.focus();
    }
  }

  requestNewCode(): void {

    if (!this.canRequestNewCode()) {
      return;
    }

    this.generateCode();
    this.startTimer();
  }

  private generateCode(): void {

    const code = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    this.verificationCode.set(code);

    console.log(
      `Код подтверждения для ${this.userPhone()}: ${code}`
    );
  }

  private startTimer(): void {

    this.stopTimer();

    this.timer.set(30);
    this.canRequestNewCode.set(false);

    this.timerId = setInterval(() => {

      if (this.timer() > 1) {

        this.timer.update(value => value - 1);

      } else {

        this.timer.set(0);
        this.canRequestNewCode.set(true);

        this.stopTimer();
      }

    }, 1000);
  }

  private stopTimer(): void {

    if (this.timerId) {

      clearInterval(this.timerId);

      this.timerId = undefined;
    }
  }

  ngOnDestroy(): void {

    this.stopTimer();
  }
}
