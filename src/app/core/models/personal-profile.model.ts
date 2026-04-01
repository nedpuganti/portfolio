import { SocialLink } from './social-link.model';
import { StatItem } from './stat-item.model';

export interface PersonalProfile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  availability: string;
  summary?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  nationality?: string;
  address?: string;
  languages?: string;
  shortBio: string;
  longBio: string;
  avatarImage: string;
  resumeHref: string;
  socialLinks: SocialLink[];
  funFacts: StatItem[];
}
