export type CallToActionType = 'route' | 'external' | 'download' | 'mailto';

export interface CallToAction {
  label: string;
  href: string;
  iconLabel: string;
  type: CallToActionType;
}
