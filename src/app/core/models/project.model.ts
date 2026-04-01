export type ProjectCategory = 'Mobile' | 'Portal' | 'Dashboard' | 'Website' | 'AI/ML';

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'app-store' | 'play-store' | 'case-study';
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  industries: string[];
  previewImage: string;
  badges: string[];
  featured: boolean;
  client: string;
  year: string;
  links?: ProjectLink[];
}
