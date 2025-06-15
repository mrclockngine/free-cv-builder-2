import { CvData } from '../interfaces';
import { CvTemplate } from './cv-template';

export class MetroCvTemplate extends CvTemplate {
  constructor() {
    super(
      'Metro',
      '/template-views/metro.webp',
      {
        background: '#f5f5f5',
        backgroundInverse: '#212121',
        primaryVariants: ['#ff5722', '#e64a19', '#ff8a65'],
        primaryInverse: '#ffffff',
      },
      {
        heading: {
          name: 'Poppins',
          url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
        },
        body: {
          name: 'Nunito',
          url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap',
        },
      },
      {
        h1: {
          size: 1.8,
          weight: '600',
          lineHeight: 1.1,
          fontFamily: 'heading',
          uppercase: true,
        },
        h2: {
          size: 1.4,
          weight: '500',
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
      this.renderSpace(0.5),
      this.renderText(data.personalInfo.jobTitle, 'h3'),
    ];

    const body = [this.renderText('Experience section', 'normal')];

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

export const METRO_TEMPLATE = new MetroCvTemplate();
