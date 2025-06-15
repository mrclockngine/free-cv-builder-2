import { CvData } from '../interfaces';
import { CvTemplate } from './cv-template';

export class MinimalistCvTemplate extends CvTemplate {
  constructor() {
    super(
      'Minimalist',
      '/template-views/minimalist.webp',
      {
        background: '#ffffff',
        backgroundInverse: '#000000',
        primaryVariants: ['#222222', '#555555', '#999999'],
        primaryInverse: '#ffffff',
      },
      {
        heading: {
          name: 'Merriweather',
          url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap',
        },
        body: {
          name: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap',
        },
      },
      {
        h1: {
          size: 1.7,
          weight: '700',
          lineHeight: 1.1,
          fontFamily: 'heading',
        },
        h2: {
          size: 1.4,
          weight: '600',
          lineHeight: 1.2,
          fontFamily: 'heading',
        },
        h3: {
          size: 1.2,
          weight: '400',
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
      false
    );
  }

  override renderContent(data: CvData): string[] {
    const header = [
      this.renderText(data.personalInfo.name, 'h1'),
      this.renderText(data.personalInfo.jobTitle, 'h3'),
    ];

    const body = [this.renderText('Your details here.', 'normal')];

    return [
      this.renderDiv({
        children: [...header, ...body],
        padding: [1, 1],
        styles: { 'text-align': 'left' },
      }),
    ];
  }
}

export const MINIMALIST_TEMPLATE = new MinimalistCvTemplate();
