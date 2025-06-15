import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StepKeys } from '../builder/steps';

@Injectable({
  providedIn: 'root',
})
export class VisitedStepsService {
  private router = inject(Router);

  private _visitedSteps: Set<string> = new Set([StepKeys[0]]);

  visitStep(key: string): void {
    this._visitedSteps.add(key);
    this.router.navigate(['builder', key]);
  }

  get visitedSteps() {
    return this._visitedSteps;
  }
}
