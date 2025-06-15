import {
  AfterViewInit,
  Component,
  effect,
  EffectRef,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CvDataService, SelectedTemplateAndThemeService } from '../../services';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrl: './cv-view.component.css',
})
export class CvViewComponent implements AfterViewInit, OnDestroy {
  private selectedTemplateAndThemeService = inject(
    SelectedTemplateAndThemeService
  );
  private cvDataService = inject(CvDataService);
  private sanitizer = inject(DomSanitizer);

  private container =
    viewChild.required<ElementRef<HTMLDivElement>>('container');
  private previewContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('previewContainer');

  @ViewChild('cvPreview', { read: ViewContainerRef, static: true })
  cvPreview!: ViewContainerRef;

  private resizeObserver!: ResizeObserver;
  private effectRef: EffectRef;

  templateHtml = signal('');

  constructor() {
    this.effectRef = effect(() => {
      const primaryVariantIndex =
        this.selectedTemplateAndThemeService.primaryVariant();
      const template = this.selectedTemplateAndThemeService.selectedTemplate;

      template.setPrimaryVariant(primaryVariantIndex);

      this.templateHtml.set(
        this.sanitizer.bypassSecurityTrustHtml(
          template.renderHTML(this.cvDataService.data())
        ) as string
      );
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      const [entry] = entries;
      if (!entry) return;

      const previewContainer = this.previewContainer().nativeElement;

      const { width: cw } = entry.contentRect;

      const vw = Math.min(600, cw);
      const vh = (297 * vw) / 210;

      previewContainer.style.width = `${vw}px`;
      previewContainer.style.minHeight = `${vh}px`;
    });

    this.resizeObserver.observe(this.container().nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.effectRef.destroy();
  }
}
