import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { BaseComponent } from '../base.component';
import { FontLoaderService, VisitedStepsService } from '../services';
import { ButtonComponent } from '../shared';
import { CvTemplates } from '../templates';
import { CvViewComponent } from './cv-view/cv-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StepBarComponent } from './step-bar/step-bar.component';
import { StepKeys, Steps } from './steps';

@Component({
  selector: 'app-builder',
  imports: [
    NavbarComponent,
    StepBarComponent,
    ButtonComponent,
    CvViewComponent,
    RouterModule,
  ],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css',
})
export class BuilderComponent extends BaseComponent implements OnInit {
  private router = inject(Router);
  private visitedStepsService = inject(VisitedStepsService);
  private fontLoader = inject(FontLoaderService);

  cvViewShowing = signal(false);
  currentStep = signal(StepKeys[0]);

  setCurrentStep(stepKey: string) {
    if (!this.visitedStepsService.visitedSteps.has(stepKey)) {
      this.visitedStepsService.visitStep(StepKeys[0]);
      return;
    }
    this.currentStep.set(stepKey);
  }

  ngOnInit(): void {
    const url = this.router.url;
    const stepKey = url.split('/').pop();
    if (stepKey) {
      this.setCurrentStep(stepKey);
    }

    this.sub$.sink = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        const stepKey = event.url.split('/').pop();
        if (stepKey) {
          this.setCurrentStep(stepKey);
        }
      });

    // load initial fonts
    const intialTemplate = CvTemplates[0];
    this.fontLoader.load(intialTemplate.fonts.heading.url);
    this.fontLoader.load(intialTemplate.fonts.body.url);
  }

  toggleCvViewShowing() {
    this.cvViewShowing.update((v) => !v);
  }

  get nextStep() {
    const currentIndex = StepKeys.indexOf(this.currentStep());
    if (currentIndex < StepKeys.length - 1) {
      return Steps[currentIndex + 1];
    }
    return null;
  }

  get previousStep() {
    const currentIndex = StepKeys.indexOf(this.currentStep());
    if (currentIndex > 0) {
      return Steps[currentIndex - 1];
    }
    return null;
  }

  visitStep(key: string) {
    this.visitedStepsService.visitStep(key);
  }
}
