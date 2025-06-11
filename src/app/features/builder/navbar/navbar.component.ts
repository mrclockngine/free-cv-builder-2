import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BaseComponent } from '../../../core/base.component';
import { ButtonComponent } from '../../../shared';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends BaseComponent {
  menuShowing = signal(false);
}
