import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import {
  FontLoaderService,
  SelectedTemplateAndThemeService,
} from '../../../../services';
import { CvTemplates } from '../../../../templates';

@Component({
  selector: 'app-template-selector',
  imports: [NgOptimizedImage],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplateSelectorComponent implements AfterViewInit {
  private selectedTemplateAndThemeService = inject(
    SelectedTemplateAndThemeService
  );
  private fontLoader = inject(FontLoaderService);

  private swiper = viewChild.required<ElementRef<SwiperContainer>>('swiper');

  ngAfterViewInit(): void {
    const swiperElement = this.swiper().nativeElement;
    Object.assign(swiperElement, {
      slidesPerView: 1.5,
      spaceBetween: 20,
      navigation: true,
      breakpoints: {
        480: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
      },
    });
    swiperElement.initialize();
  }

  get templates() {
    return CvTemplates;
  }

  getIsSelected(i: number) {
    return this.selectedTemplateAndThemeService.template() === i;
  }

  async selectTemplate(index: number) {
    this.selectedTemplateAndThemeService.selectTemplate(index);
  }
}
