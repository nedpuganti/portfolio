import { CallToAction } from './call-to-action.model';
import { EducationItem } from './education-item.model';
import { PersonalProfile } from './personal-profile.model';
import { Project } from './project.model';
import { SkillCategory } from './skill-category.model';
import { StatItem } from './stat-item.model';

export type ContextWidgetType = 'featured-projects' | 'about' | 'skills' | 'education' | 'quick-stats';

export interface ContextPanelWidget {
  id: string;
  type: ContextWidgetType;
  title: string;
  description?: string;
  projects?: Project[];
  profile?: PersonalProfile;
  skills?: SkillCategory[];
  education?: EducationItem[];
  stats?: StatItem[];
}

export interface ContextPanelState {
  eyebrow: string;
  title: string;
  description: string;
  widgets: ContextPanelWidget[];
  actions: CallToAction[];
}
