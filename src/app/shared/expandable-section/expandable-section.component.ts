import {
  Component,
  ElementRef,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { twMerge } from 'tailwind-merge';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-expandable-section',
  imports: [LucideAngularModule],
  templateUrl: './expandable-section.component.html',
  styleUrl: './expandable-section.component.css',
})
export class ExpandableSectionComponent
  extends BaseComponent
  implements OnInit
{
  title = input.required<string>();
  styleClass = input('');
  contentContailerClass = input('');
  initiallyExpanded = input<boolean | ''>(false);

  expanded = signal(false);

  contentContainer = viewChild<ElementRef<HTMLDivElement>>('content_container');

  ngOnInit(): void {
    this.expanded.set(this.initiallyExpanded() !== false);
  }

  get wrapperClassName() {
    return twMerge(
      'flex flex-col rounded border border-slate-200',
      this.styleClass()
    );
  }

  get contentContainerClassName() {
    return twMerge('px-5 pb-5 pt-1', this.contentContailerClass());
  }

  toggleExpanded() {
    if (!this.expanded()) {
      setTimeout(() => {
        this.contentContainer()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
    this.expanded.set(!this.expanded());
  }
}
