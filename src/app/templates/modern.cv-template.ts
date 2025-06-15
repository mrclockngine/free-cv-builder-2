import { CvData } from '../interfaces';
import { CvTemplate } from './cv-template';

export class ModernCvTemplate extends CvTemplate {
  constructor() {
    super(
      'Modern',
      '/template-views/modern.webp',
      {
        background: '#f0f4f8',
        backgroundInverse: '#222222',
        primaryVariants: ['#00bcd4', '#0097a7', '#4dd0e1'],
        primaryInverse: '#ffffff',
      },
      {
        heading: {
          name: 'Montserrat',
          url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
        },
        body: {
          name: 'Roboto',
          url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap',
        },
      },
      {
        h1: {
          size: 1.9,
          weight: '600',
          lineHeight: 1.1,
          fontFamily: 'heading',
        },
        h2: {
          size: 1.5,
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
      true
    );
  }

  override renderContent(data: CvData): string[] {
    const header = [
      this.renderText(data.personalInfo.name, 'h1'),
      this.renderText(data.personalInfo.jobTitle, 'h3'),
    ];

    const body = [this.renderText('Description content.', 'normal')];

    return [
      this.renderDiv({
        children: [
          this.renderDiv({
            children: header,
            padding: [1, 1],
            styles: {
              'background-color': 'var(--color-primary)',
              color: 'var(--color-primary-inverse)',
              'text-align': 'center',
            },
          }),
          this.renderDiv({ children: body, padding: [1, 1], styles: {} }),
        ],
        styles: { height: '100%', display: 'flex', 'flex-direction': 'column' },
      }),
    ];
  }
}

export const MODERN_TEMPLATE = new ModernCvTemplate();
