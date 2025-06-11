import { Component, forwardRef, input, signal } from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { twMerge } from 'tailwind-merge';
import { BaseComponent } from '../../core/base.component';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent extends BaseComponent {
  label = input('');
  placeholder = input('');
  styleClass = input('');
  control = input.required<FormControl<string>>();

  focused = signal(false);

  get isOkay() {
    if (!this.control().touched) return undefined;
    if (!this.control().errors?.['required'] && !this.control().value)
      return undefined;

    return this.control().valid;
  }

  get hint() {
    if (this.isOkay === undefined) return '';
    if (this.isOkay) return '';

    const errors = this.control().errors;
    if (errors?.['email']) return 'Doesn’t look like a valid email';
    if (errors?.['minlength']) {
      return `Let’s make that a bit longer, at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors?.['maxlength']) {
      return `Keep it under ${errors['maxlength'].requiredLength} characters`;
    }
    if (errors?.['pattern'])
      return 'Hmm, that format seems off. Double-check it just to be safe';
    if (errors?.['required']) return 'Recommended to have this filled out';

    return 'Just a heads-up: this input doesn’t look quite right.';
  }

  get className() {
    return twMerge(
      'flex items-center space-x-2 px-4 h-12 rounded',
      this.focused() ? 'bg-indigo-100' : 'bg-slate-200'
    );
  }

  get wrapperClassName() {
    return twMerge('flex flex-col space-y-1', this.styleClass());
  }
}
