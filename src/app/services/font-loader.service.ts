import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FontLoaderService {
  private loadedFonts = signal<string[]>([]);

  load(url: string) {
    if (this.loadedFonts().includes(url)) {
      return;
    }
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    this.loadedFonts.update((fonts) => [...fonts, url]);
  }
}
