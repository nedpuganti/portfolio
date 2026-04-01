import { EducationItem } from './education-item.model';
import { ExperienceItem } from './experience-item.model';
import { PersonalProfile } from './personal-profile.model';
import { Project } from './project.model';
import { PromptSuggestion } from './prompt-suggestion.model';
import { RecentConversation } from './recent-conversation.model';
import { ServiceItem } from './service-item.model';
import { SkillCategory } from './skill-category.model';
import { StatItem } from './stat-item.model';

export interface DataEnvelope<T> {
  data: T;
}

export interface PortfolioAdditionalData extends Partial<PersonalProfile> {
  promptSuggestions?: PromptSuggestion[];
  recentConversations?: RecentConversation[];
}

export interface PortfolioApiPayload {
  contact: Partial<PersonalProfile>;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  services: ServiceItem[];
  stats: StatItem[];
  additional: Partial<PortfolioAdditionalData>;
}
