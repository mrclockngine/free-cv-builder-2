import { CvData } from '../interfaces';
import { CvTemplate } from './cv-template';

export class AuraCvTemplate extends CvTemplate {
  constructor() {
    super(
      'Aura',
      '/template-views/aura.webp',
      {
        background: '#ffffff',
        backgroundInverse: '#000000',
        primaryVariants: ['#6200ea', '#3700b3', '#03dac6'],
        primaryInverse: '#ffffff',
      },
      {
        heading: {
          name: 'Roboto',
          url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap',
        },
        body: {
          name: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap',
        },
      },
      {
        h1: {
          size: 1.8,
          weight: '500',
          lineHeight: 1.1,
          fontFamily: 'heading',
          uppercase: true,
        },
        h2: {
          size: 1.5,
          weight: '600',
          lineHeight: 1.2,
          fontFamily: 'heading',
        },
        h3: {
          size: 1.3,
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
      this.renderSpace(0.5),
      this.renderText(data.personalInfo.jobTitle, 'h3'),
    ];

    const body = [this.renderText('Body', 'normal')];
    return [
      this.renderDiv({
        children: [
          this.renderDiv({
            children: header,
            padding: [1, 1],
            styles: {
              width: '40%',
              'background-color': 'var(--color-primary)',
              color: 'var(--color-primary-inverse)',
            },
          }),
          this.renderDiv({
            children: body,
            padding: [1, 1],
            styles: {
              width: '60%',
              'background-color': 'var(--color-background)',
              color: 'var(--color-background-inverse)',
            },
          }),
        ],
        styles: {
          display: 'flex',
          flex: '1',
          height: '100%',
        },
      }),
    ];
  }
}

export const AURA_TEMPLATE = new AuraCvTemplate();
