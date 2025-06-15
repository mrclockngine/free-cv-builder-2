import { Component } from '@angular/core';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { TemplateSelectorComponent } from './template-selector/template-selector.component';

@Component({
  selector: 'app-template-and-theme',
  imports: [TemplateSelectorComponent, ColorSelectorComponent],
  templateUrl: './template-and-theme.component.html',
  styleUrl: './template-and-theme.component.css',
})
export class TemplateAndThemeComponent {}
