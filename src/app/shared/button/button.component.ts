import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { twMerge } from 'tailwind-merge';
import { BaseComponent } from '../../base.component';
import { IconName } from '../../icons';

@Component({
  selector: 'app-button',
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent extends BaseComponent {
  label = input<string>();
  icon = input<IconName>();
  iconAtEnd = input<boolean | ''>(false);
  theme = input<
    'primary' | 'secondary' | 'secondary-alt' | 'danger' | 'danger-alt'
  >('primary');
  // iconSize = input<'s' | 'm' | 'l'>('m');
  variant = input<'icon' | 'normal'>('normal');
  size = input<'s' | 'm' | 'l'>('m');
  disabled = input<boolean | ''>(false);
  text = input<boolean | ''>(false);
  styleClass = input<string>('');

  routerLink = input<string>();
  loading = input<boolean | ''>(false);

  onClick = output<MouseEvent>();

  private readonly nonTextThemeClasses = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
    'secondary-alt': 'bg-indigo-100 text-indigo-500 hover:bg-indigo-200',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    'danger-alt': 'bg-red-100 text-red-500 hover:bg-red-200',
  };

  private readonly textThemeClasses = {
    primary: 'text-indigo-500 hover:bg-indigo-100',
    secondary: 'text-slate-800 hover:bg-slate-200',
    'secondary-alt': 'text-indigo-500 hover:bg-indigo-100',
    danger: 'text-red-500 hover:bg-red-100',
    'danger-alt': 'text-red-500 hover:bg-red-100',
  };

  private readonly variantClasses = {
    icon: 'flex items-center justify-center rounded-full',
    normal: 'font-medium rounded',
  };

  private readonly sizeClasses = {
    icon: {
      s: 'size-8',
      m: 'size-10',
      l: 'size-12',
    },
    normal: {
      s: 'px-3 h-8 text-sm',
      m: 'px-4 h-10 text-base',
      l: 'px-6 h-12 text-lg',
    },
  };

  get className() {
    return twMerge(
      'cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-70',
      this.text() !== false
        ? this.textThemeClasses[this.theme()]
        : this.nonTextThemeClasses[this.theme()],
      this.sizeClasses[this.variant()][this.size()],
      this.variantClasses[this.variant()],
      this.variant() === 'normal' &&
        this.icon() &&
        'flex items-center space-x-2 justify-center',
      this.styleClass()
    );
  }
}
