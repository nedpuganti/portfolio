import { PromptSuggestion, RecentConversation } from '../models';

export const DEFAULT_PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: 'technical-stack',
    label: 'What frontend and backend technologies do you use?',
    description: 'A quick look at Naren’s core stack across UI, APIs, and databases.',
    prompt: 'What frontend and backend technologies do you use?',
    iconLabel: 'SK',
    intent: 'skills-overview'
  },
  {
    id: 'platform-work',
    label: 'What is your platform engineering experience?',
    description: 'CI/CD, release workflows, containers, and delivery systems behind the UI.',
    prompt: 'What is your platform engineering experience?',
    iconLabel: 'PE',
    intent: 'platform-engineering'
  },
  {
    id: 'experience-history',
    label: 'Tell me about your experience and work history',
    description: 'A concise overview of roles, years of experience, and engineering focus.',
    prompt: 'Tell me about your experience and work history',
    iconLabel: '30',
    intent: 'experience-summary'
  },
  {
    id: 'projects',
    label: 'What projects best represent your full-stack work?',
    description: 'A curated mix of dashboards, portals, and product builds.',
    prompt: 'What projects best represent your full-stack work?',
    iconLabel: 'FP',
    intent: 'featured-projects'
  },
  {
    id: 'mobile-apps',
    label: 'What mobile apps have you built?',
    description: 'Cross-platform product work across Ionic and Flutter.',
    prompt: 'What mobile apps have you built?',
    iconLabel: 'MB',
    intent: 'mobile-projects'
  },
  {
    id: 'contact-availability',
    label: 'How can someone contact or hire you?',
    description: 'Reach-out details, availability, and role alignment.',
    prompt: 'How can someone contact or hire you?',
    iconLabel: 'CT',
    intent: 'contact'
  }
];

export const DEFAULT_RECENT_CONVERSATIONS: RecentConversation[] = [
  {
    id: 'recent-stack',
    label: 'Technical stack',
    prompt: 'What frontend and backend technologies do you use?'
  },
  {
    id: 'recent-platform',
    label: 'Platform engineering',
    prompt: 'What is your platform engineering experience?'
  },
  {
    id: 'recent-experience',
    label: 'Experience and work history',
    prompt: 'Tell me about your experience and work history'
  },
  {
    id: 'recent-projects',
    label: 'Full-stack projects',
    prompt: 'What projects best represent your full-stack work?'
  },
  {
    id: 'recent-contact',
    label: 'Contact and availability',
    prompt: 'How can someone contact or hire you?'
  }
];
