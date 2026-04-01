export type SkillType = 'hard' | 'soft';
export type SkillProficiency = 'Expert' | 'Advanced' | 'Strong' | 'Working';

export interface SkillItem {
  name: string;
  proficiency: SkillProficiency;
}

export interface SkillGroup {
  id: string;
  title?: string;
  description?: string;
  skills: SkillItem[];
  groups?: SkillGroup[];
}

export interface SkillCategory {
  id: string;
  title: string;
  type: SkillType;
  description: string;
  skills: SkillItem[];
  groups?: SkillGroup[];
}
