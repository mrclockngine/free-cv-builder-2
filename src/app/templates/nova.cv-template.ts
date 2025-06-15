import { CvData } from '../interfaces';
import { CvTemplate } from './cv-template';

export class NovaCvTemplate extends CvTemplate {
  constructor() {
    super(
      'Nova',
      '/template-views/nova.webp',
      {
        background: '#f9fafb',
        backgroundInverse: '#111827',
        primaryVariants: ['#2563eb', '#1d4ed8', '#60a5fa'],
        primaryInverse: '#ffffff',
      },
      {
        heading: {
          name: 'Lato',
          url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
        },
        body: {
          name: 'Source Sans Pro',
          url: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap',
        },
      },
      {
        h1: {
          size: 2,
          weight: '700',
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
          size: 1.2,
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

    const body = [this.renderText('Summary goes here.', 'normal')];

    return [
      this.renderDiv({
        children: [
          this.renderDiv({
            children: header,
            padding: [1, 1],
            styles: {
              'text-align': 'center',
              'background-color': 'var(--color-primary)',
              color: 'var(--color-primary-inverse)',
            },
          }),
          this.renderDiv({ children: body, padding: [1, 1], styles: {} }),
        ],
        styles: { height: '100%', display: 'flex', 'flex-direction': 'column' },
      }),
    ];
  }
}

export const NOVA_TEMPLATE = new NovaCvTemplate();
