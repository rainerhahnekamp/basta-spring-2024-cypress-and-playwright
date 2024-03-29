import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewsletterService } from '@app/newsletter/newsletter.service';

@Component({
  selector: 'app-newsletter',
  template: `<h2>Newsletter</h2>
    <form (ngSubmit)="handleSubmit()" [formGroup]="formGroup">
      <input data-testid="inp-email" formControlName="email" type="text" />
      <button data-testid="btn-subscribe" hidden>Subscribe</button>
    </form>

    <p data-testid="p-message">{{ message() }}</p> `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class NewsletterComponent {
  message = signal('');
  newsletterService = inject(NewsletterService);
  formGroup = inject(NonNullableFormBuilder).group({
    email: ['', Validators.required],
  });

  handleSubmit() {
    if (this.formGroup.valid) {
      this.newsletterService
        .send(this.formGroup.getRawValue().email)
        .subscribe(() => {
          this.message.set('Thank you for your subscription');
        });
    } else {
      this.message.set('Please provide an email');
    }
  }
}
