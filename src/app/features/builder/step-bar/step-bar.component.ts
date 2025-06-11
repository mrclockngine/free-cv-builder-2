import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { BaseComponent } from '../../../core/base.component';
import { VisitedStepsService } from '../../../core/services';
import { Steps } from '../../../steps';

@Component({
  selector: 'app-step-bar',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './step-bar.component.html',
  styleUrl: './step-bar.component.css',
})
export class StepBarComponent extends BaseComponent {
  private visitedStepsService = inject(VisitedStepsService);

  currentStep = input.required<string>();

  get steps() {
    return Steps;
  }

  isVisited(key: string) {
    return this.visitedStepsService.visitedSteps.has(key);
  }

  visitStep(key: string) {
    this.visitedStepsService.visitStep(key);
  }
}
