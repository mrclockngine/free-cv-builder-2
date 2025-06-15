import { CvData } from '../interfaces';
import { CvTemplate } from './cv-template';

export class ElegantCvTemplate extends CvTemplate {
  constructor() {
    super(
      'Elegant',
      '/template-views/elegant.webp',
      {
        background: '#ffffff',
        backgroundInverse: '#333333',
        primaryVariants: ['#a83279', '#d38312', '#3f51b5'],
        primaryInverse: '#ffffff',
      },
      {
        heading: {
          name: 'Playfair Display',
          url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
        },
        body: {
          name: 'Lato',
          url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
        },
      },
      {
        h1: { size: 2, weight: '700', lineHeight: 1.1, fontFamily: 'heading' },
        h2: {
          size: 1.5,
          weight: '600',
          lineHeight: 1.2,
          fontFamily: 'heading',
        },
        h3: {
          size: 1.3,
          weight: '500',
          lineHeight: 1.2,
          fontFamily: 'heading',
        },
        normal: { size: 1, weight: '400', lineHeight: 1.6, fontFamily: 'body' },
        small: {
          size: 0.8,
          weight: '400',
          lineHeight: 1.4,
          fontFamily: 'body',
        },
      },
      true
    );
  }

  override renderContent(data: CvData): string[] {
    const header = [
      this.renderText(data.personalInfo.name, 'h1'),
      this.renderText(data.personalInfo.jobTitle, 'h3'),
    ];

    const body = [this.renderText('Content area', 'normal')];

    return [
      this.renderDiv({
        children: [...header, ...body],
        padding: [1, 1],
        styles: { 'text-align': 'center' },
      }),
    ];
  }
}

export const ELEGANT_TEMPLATE = new ElegantCvTemplate();
