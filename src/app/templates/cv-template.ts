import { CvData } from '../interfaces';

export interface ColorPalette {
  background: string;
  backgroundInverse: string;
  primaryVariants: string[];
  primaryInverse: string;
}

export interface Font {
  name: string;
  url: string;
}

export interface FontVariant {
  size: number;
  weight: string;
  lineHeight: number;
  fontFamily: 'heading' | 'body';
  uppercase?: boolean;
}

export abstract class CvTemplate {
  private selectedPrimaryVariant = 0;
  protected static readonly scale = 11; // 1rem = <>px

  constructor(
    public name: string,
    public viewImage: string,
    public colors: ColorPalette,
    public fonts: {
      heading: Font;
      body: Font;
    },
    public fontVariants: Record<string, FontVariant>,
    public withPhoto: boolean = true
  ) {}

  setPrimaryVariant(index: number) {
    if (index >= 0 && index < this.colors.primaryVariants.length) {
      this.selectedPrimaryVariant = index;
    }
  }

  get primaryColor(): string {
    return (
      this.colors.primaryVariants.at(this.selectedPrimaryVariant) ||
      this.colors.primaryVariants[0]
    );
  }

  protected size(size: number): string {
    return CvTemplate.scale * size + 'px';
  }

  private renderBlock(
    children: string,
    tagName: string,
    styles: Record<string, string>,
    className: string = ''
  ): string {
    const styleText = Object.keys(styles)
      .map((prop) => `${prop}: ${styles[prop]};`)
      .join('');

    return `<${tagName} style="${styleText}" class="${className}">${children}</${tagName}>`;
  }

  renderDiv({
    children = [],
    padding = [0, 0],
    styles = {},
  }: {
    children?: string[];
    padding?: [number, number];
    styles?: Record<string, string>;
  }) {
    return this.renderBlock(children.join(''), 'div', {
      padding: `${this.size(padding[1])} ${this.size(padding[0])}`,
      ...styles,
    });
  }

  renderText(children: string, variant: string) {
    return this.renderBlock(children, 'span', {}, variant);
  }

  renderSpace(size: number, type: 'vertical' | 'horizontal' = 'vertical') {
    return this.renderBlock('', 'div', {
      [type === 'vertical' ? 'height' : 'width']: this.size(size),
      [type === 'vertical' ? 'width' : 'height']: '1px',
      'flex-shrink': '0',
    });
  }

  abstract renderContent(data: CvData): string[];

  renderHTML(data: CvData): string {
    const fontStyles = Object.entries(this.fontVariants).reduce(
      (acc, [key, variant]) => {
        acc += `
          .${key} {
            font-size: ${this.size(variant.size)};
            font-weight: ${variant.weight};
            line-height: ${variant.lineHeight * 100}%;
            font-family: var(--font-${variant.fontFamily});
            ${variant.uppercase ? 'text-transform: uppercase;' : ''}
          }
        `;
        return acc;
      },
      ''
    );

    return `
    <style>

    .cv-preview-root{
      --color-bg: ${this.colors.background};
      --color-bg-inverse: ${this.colors.backgroundInverse};
      --color-primary: ${this.primaryColor};
      --color-primary-inverse: ${this.colors.primaryInverse};

      --font-heading: '${this.fonts.heading.name}';
      --font-body: '${this.fonts.body.name}';
    }

    ${fontStyles}
    </style>
    <div class='cv-preview-root'>
    ${this.renderContent(data).join('')}
    </div>`;
  }
}
