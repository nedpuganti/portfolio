import { Project, SkillCategory } from '../models';

export interface ProjectGroup {
  category: string;
  projects: Project[];
}

export function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

export function filterProjectsByTag(projects: Project[], tag: string): Project[] {
  const normalizedTag = normalizeQuery(tag);

  return projects.filter((project) => {
    const haystack = [
      project.title,
      project.category,
      project.shortDescription,
      project.longDescription,
      project.client,
      ...project.badges,
      ...project.industries,
      ...project.techStack
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedTag);
  });
}

export function groupProjectsByCategory(projects: Project[]): ProjectGroup[] {
  const orderedCategories = ['Dashboard', 'Portal', 'Mobile', 'Website', 'AI/ML'];
  const discoveredCategories = projects
    .map((project) => project.category)
    .filter((category, index, categories) => !orderedCategories.includes(category) && categories.indexOf(category) === index);

  return [...orderedCategories, ...discoveredCategories]
    .map((category) => ({
      category,
      projects: projects.filter((project) => project.category === category)
    }))
    .filter((group) => group.projects.length > 0);
}

export function flattenSkillNames(categories: SkillCategory[]): string[] {
  return categories.flatMap((category) => category.skills.map((skill) => skill.name));
}
