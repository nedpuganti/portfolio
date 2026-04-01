import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface IconPath {
  d: string;
  fill?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  strokeLinejoin?: 'round' | 'miter' | 'bevel';
}

interface IconDefinition {
  viewBox: string;
  paths: IconPath[];
}

const STROKE_ICON = (paths: IconPath[]): IconDefinition => ({
  viewBox: '0 0 24 24',
  paths
});

const ICONS: Record<string, IconDefinition> = {
  AI: STROKE_ICON([
    { d: 'M3 5h18v14H3z' },
    { d: 'M3 8h18' },
    { d: 'M7 12l2 2-2 2' },
    { d: 'M11 16h5' },
    { d: 'M17.5 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z', strokeWidth: 1.5 }
  ]),
  AB: STROKE_ICON([
    { d: 'M12 11a3 3 0 100-6 3 3 0 000 6z' },
    { d: 'M7 20a5 5 0 0110 0' },
    { d: 'M5 10l-2 2 2 2' },
    { d: 'M19 10l2 2-2 2' }
  ]),
  PR: STROKE_ICON([
    { d: 'M7 6a2 2 0 110-4 2 2 0 010 4z' },
    { d: 'M7 20a2 2 0 110-4 2 2 0 010 4z' },
    { d: 'M17 14a2 2 0 110-4 2 2 0 010 4z' },
    { d: 'M7 6v8a4 4 0 004 4h4' },
    { d: 'M17 10V6' }
  ]),
  XP: STROKE_ICON([
    { d: 'M6 6a2 2 0 110-4 2 2 0 010 4z' },
    { d: 'M18 11a2 2 0 110-4 2 2 0 010 4z' },
    { d: 'M6 20a2 2 0 110-4 2 2 0 010 4z' },
    { d: 'M8 5h4a4 4 0 014 4' },
    { d: 'M6 8v8' },
    { d: 'M8 19h8' }
  ]),
  SK: STROKE_ICON([
    { d: 'M8 5c-2 1.2-3 3-3 7s1 5.8 3 7' },
    { d: 'M16 5c2 1.2 3 3 3 7s-1 5.8-3 7' },
    { d: 'M13.5 4L10.5 20' }
  ]),
  ED: STROKE_ICON([
    { d: 'M4 5h7a3 3 0 013 3v11H7a3 3 0 00-3 3V5z' },
    { d: 'M20 5h-7a3 3 0 00-3 3v11h7a3 3 0 013 3V5z' },
    { d: 'M8 10l-1 2 1 2', strokeWidth: 1.5 },
    { d: 'M16 10l1 2-1 2', strokeWidth: 1.5 }
  ]),
  CT: STROKE_ICON([
    { d: 'M4 6h16v12H4z' },
    { d: 'M4 8h16' },
    { d: 'M7 12l2 2-2 2' },
    { d: 'M11.5 16H17' }
  ]),
  NC: STROKE_ICON([
    { d: 'M4 5h16v14H4z' },
    { d: 'M4 8h16' },
    { d: 'M7 12l2 2-2 2' },
    { d: 'M12 16h3' },
    { d: 'M18 3v6' },
    { d: 'M15 6h6' }
  ]),
  CV: STROKE_ICON([
    { d: 'M8 3h6l4 4v13a1 1 0 01-1 1H8a2 2 0 01-2-2V5a2 2 0 012-2z' },
    { d: 'M14 3v4h4' },
    { d: 'M9 11l-2 2 2 2', strokeWidth: 1.5 },
    { d: 'M13 11l2 2-2 2', strokeWidth: 1.5 },
    { d: 'M12 10l-1.5 6', strokeWidth: 1.5 }
  ]),
  RC: STROKE_ICON([
    { d: 'M4 5h16v14H4z' },
    { d: 'M4 8h16' },
    { d: 'M7 12l2 2-2 2' },
    { d: 'M11.5 16H15' },
    { d: 'M18.5 10a3.5 3.5 0 10.2 5.1' },
    { d: 'M19 8v3h-3' }
  ]),
  WB: STROKE_ICON([
    { d: 'M3 12h18' },
    { d: 'M12 3c2.8 2.8 4.5 5.8 4.5 9S14.8 18.2 12 21c-2.8-2.8-4.5-5.8-4.5-9S9.2 5.8 12 3z' },
    { d: 'M12 3a15.5 15.5 0 00-4.5 9A15.5 15.5 0 0012 21' },
    { d: 'M7.5 8.5L6 10l1.5 1.5', strokeWidth: 1.5 },
    { d: 'M16.5 8.5L18 10l-1.5 1.5', strokeWidth: 1.5 }
  ]),
  EM: STROKE_ICON([
    { d: 'M4 6h16v12H4z' },
    { d: 'M4 7l8 6 8-6' },
    { d: 'M8.5 12L7 14l1.5 2', strokeWidth: 1.5 },
    { d: 'M15.5 12l1.5 2-1.5 2', strokeWidth: 1.5 }
  ]),
  GH: {
    viewBox: '0 0 24 24',
    paths: [
      {
        d:
          'M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.09 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.72 0 0 .85-.28 2.8 1.06A9.48 9.48 0 0112 6.84c.85 0 1.7.12 2.5.35 1.95-1.34 2.8-1.06 2.8-1.06.55 1.41.2 2.46.1 2.72.64.73 1.03 1.65 1.03 2.78 0 3.96-2.34 4.82-4.57 5.08.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.23 10.23 0 0022 12.22C22 6.58 17.52 2 12 2z',
        fill: 'currentColor'
      }
    ]
  },
  AU: STROKE_ICON([
    { d: 'M12 3v3' },
    { d: 'M12 18v3' },
    { d: 'M4.9 4.9l2.1 2.1' },
    { d: 'M17 17l2.1 2.1' },
    { d: 'M3 12h3' },
    { d: 'M18 12h3' },
    { d: 'M4.9 19.1L7 17' },
    { d: 'M17 7l2.1-2.1' },
    { d: 'M12 16a4 4 0 100-8 4 4 0 000 8z' }
  ]),
  DK: STROKE_ICON([{ d: 'M15.5 3.5a7 7 0 100 17 8 8 0 110-17z' }]),
  LT: STROKE_ICON([
    { d: 'M12 4v2.5' },
    { d: 'M12 17.5V20' },
    { d: 'M4 12h2.5' },
    { d: 'M17.5 12H20' },
    { d: 'M6.3 6.3l1.8 1.8' },
    { d: 'M15.9 15.9l1.8 1.8' },
    { d: 'M6.3 17.7l1.8-1.8' },
    { d: 'M15.9 8.1l1.8-1.8' },
    { d: 'M12 16a4 4 0 100-8 4 4 0 000 8z' }
  ]),
  FP: STROKE_ICON([
    { d: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z' },
    { d: 'M12 9l.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3.9-1.9z', strokeWidth: 1.5 }
  ]),
  PE: STROKE_ICON([
    { d: 'M5 7h14' },
    { d: 'M5 12h14' },
    { d: 'M5 17h14' },
    { d: 'M7 5v14' },
    { d: 'M17 5v14' },
    { d: 'M10 9h4', strokeWidth: 1.5 },
    { d: 'M10 14h4', strokeWidth: 1.5 }
  ]),
  MB: STROKE_ICON([
    { d: 'M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z' },
    { d: 'M9 10l-1.5 2L9 14', strokeWidth: 1.5 },
    { d: 'M15 10l1.5 2-1.5 2', strokeWidth: 1.5 },
    { d: 'M11 17h2' }
  ]),
  DP: STROKE_ICON([
    { d: 'M4 5h16v14H4z' },
    { d: 'M4 9h16' },
    { d: 'M9 9v10' },
    { d: 'M12 13h5' },
    { d: 'M12 16h3' }
  ]),
  '30': STROKE_ICON([
    { d: 'M4 6h16v12H4z' },
    { d: 'M4 9h16' },
    { d: 'M7 13l2 2-2 2' },
    { d: 'M12 17h2' },
    { d: 'M18 15v-3l2 1.5-2 1.5' }
  ]),
  ER: STROKE_ICON([
    { d: 'M12 9v4' },
    { d: 'M12 17h.01' },
    { d: 'M10.3 3.9L2.8 17a1 1 0 00.9 1.5h16.6a1 1 0 00.9-1.5L13.7 3.9a1 1 0 00-1.7 0z' }
  ]),
  GO: STROKE_ICON([
    { d: 'M3 11.5L21 3l-6.5 18-3.5-6.5L3 11.5z' },
    { d: 'M10.9 14.4L21 3' }
  ]),
  HI: STROKE_ICON([
    { d: 'M4 6h16v12H4z' },
    { d: 'M4 7l8 6 8-6' },
    { d: 'M8.5 12L7 14l1.5 2', strokeWidth: 1.5 },
    { d: 'M15.5 12l1.5 2-1.5 2', strokeWidth: 1.5 }
  ]),
  PH: STROKE_ICON([
    {
      d:
        'M6.5 4h2A1.5 1.5 0 0110 5.1l.6 2.4a1.5 1.5 0 01-.4 1.4l-1.4 1.3a15 15 0 006 6l1.3-1.4a1.5 1.5 0 011.4-.4l2.4.6a1.5 1.5 0 011.1 1.5v2A2 2 0 0119 21h-1C10.3 21 3 13.7 3 6V5a1 1 0 011-1h2.5z'
    }
  ]),
  LO: STROKE_ICON([
    { d: 'M12 21s6-4.4 6-10a6 6 0 10-12 0c0 5.6 6 10 6 10z' },
    { d: 'M12 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' }
  ]),
  NE: STROKE_ICON([
    { d: 'M12 12a4 4 0 100-8 4 4 0 000 8z' },
    { d: 'M5 20a7 7 0 0114 0' }
  ]),
  preview: STROKE_ICON([
    { d: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z' },
    { d: 'M12 15a3 3 0 100-6 3 3 0 000 6z' }
  ]),
  external: STROKE_ICON([
    { d: 'M14 5h5v5' },
    { d: 'M10 14L19 5' },
    { d: 'M19 13v5a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h5' }
  ]),
  'app-store': STROKE_ICON([
    { d: 'M8 6l8 12' },
    { d: 'M12 4l2 3' },
    { d: 'M6 18h12' },
    { d: 'M10 14l-2 4' }
  ]),
  'play-store': STROKE_ICON([
    { d: 'M6 4l12 8-12 8V4z' }
  ]),
  'case-study': STROKE_ICON([
    { d: 'M6 4h9a3 3 0 013 3v13H9a3 3 0 00-3 3V4z' },
    { d: 'M18 20H9a3 3 0 00-3 3' },
    { d: 'M10 9h5M10 13h5' }
  ])
};

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrl: './app-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppIconComponent {
  readonly name = input<string>('AI');

  readonly definition = computed<IconDefinition>(() => ICONS[this.name()] ?? ICONS['AI']);
}
