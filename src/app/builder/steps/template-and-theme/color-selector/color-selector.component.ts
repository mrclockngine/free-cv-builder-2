import { Component, inject } from '@angular/core';
import { SelectedTemplateAndThemeService } from '../../../../services';

@Component({
  selector: 'app-color-selector',
  imports: [],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.css',
})
export class ColorSelectorComponent {
  private selectedTemplateAndThemeService = inject(
    SelectedTemplateAndThemeService
  );

  get colors() {
    return this.selectedTemplateAndThemeService.selectedTemplate.colors
      .primaryVariants;
  }

  getIsSelected(i: number) {
    return this.selectedTemplateAndThemeService.primaryVariant() === i;
  }

  selectColor(i: number) {
    this.selectedTemplateAndThemeService.primaryVariant.set(i);
  }
}
