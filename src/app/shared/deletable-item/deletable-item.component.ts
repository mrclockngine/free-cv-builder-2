import {
  Component,
  effect,
  EffectRef,
  ElementRef,
  input,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-deletable-item',
  imports: [ButtonComponent],
  templateUrl: './deletable-item.component.html',
  styleUrl: './deletable-item.component.css',
})
export class DeletableItemComponent implements OnDestroy {
  delete = output<MouseEvent>();
  containerClass = input('');
  scrollToView = input<boolean | ''>(false);
  container = viewChild<ElementRef<HTMLDivElement>>('container');

  effectRef: EffectRef;

  constructor() {
    this.effectRef = effect((onCleanup) => {
      if (this.scrollToView() !== false) {
        const timeout = setTimeout(() => {
          this.container()?.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);

        onCleanup(() => {
          clearTimeout(timeout);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy();
  }

  get containerClassName() {
    return twMerge('flex-1', this.containerClass());
  }
}
