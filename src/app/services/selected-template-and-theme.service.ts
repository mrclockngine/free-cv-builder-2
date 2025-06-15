import { inject, Injectable, signal } from '@angular/core';
import { CvTemplates } from '../templates';
import { FontLoaderService } from './font-loader.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedTemplateAndThemeService {
  private fontLoader = inject(FontLoaderService);

  template = signal(0);
  primaryVariant = signal(0);

  get selectedTemplate() {
    return CvTemplates.at(this.template()) ?? CvTemplates[0];
  }

  get selectedPrimaryVariant() {
    return (
      this.selectedTemplate.colors.primaryVariants.at(this.primaryVariant()) ??
      this.selectedTemplate.colors.primaryVariants[0]
    );
  }

  selectTemplate(index: number) {
    this.template.set(index);
    this.primaryVariant.set(0);

    this.fontLoader.load(this.selectedTemplate.fonts.heading.url);
    this.fontLoader.load(this.selectedTemplate.fonts.body.url);
  }
}
