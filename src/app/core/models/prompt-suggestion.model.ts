export type PromptIntent =
  | 'featured-projects'
  | 'mobile-projects'
  | 'dashboards-portals'
  | 'platform-engineering'
  | 'skills-overview'
  | 'experience-summary'
  | 'about'
  | 'education'
  | 'contact'
  | 'overview';

export interface PromptSuggestion {
  id: string;
  label: string;
  description: string;
  prompt: string;
  iconLabel: string;
  intent: PromptIntent;
}
