import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

import {
  CallToAction,
  ContextPanelState,
  DataEnvelope,
  EducationItem,
  ExperienceItem,
  PersonalProfile,
  PortfolioAdditionalData,
  PortfolioApiPayload,
  Project,
  PromptSuggestion,
  RecentConversation,
  ServiceItem,
  SkillCategory,
  StatItem
} from '../models';
import { DEFAULT_PROMPT_SUGGESTIONS, DEFAULT_RECENT_CONVERSATIONS } from '../data/chat-seed.data';
import { filterProjectsByTag } from '../utils/portfolio-filter.util';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiBase = environment.portfolioApiBaseUrl;

  readonly loading = signal(false);
  readonly loaded = signal(false);
  readonly error = signal<string | null>(null);
  readonly apiStatus = signal<'checking' | 'online' | 'offline'>('checking');

  readonly profile = signal<PersonalProfile>(EMPTY_PROFILE);
  readonly projects = signal<Project[]>([]);
  readonly experience = signal<ExperienceItem[]>([]);
  readonly skillCategories = signal<SkillCategory[]>([]);
  readonly education = signal<EducationItem[]>([]);
  readonly services = signal<ServiceItem[]>([]);
  readonly promptSuggestions = signal<PromptSuggestion[]>(DEFAULT_PROMPT_SUGGESTIONS);
  readonly recentConversations = signal<RecentConversation[]>(DEFAULT_RECENT_CONVERSATIONS);

  readonly hardSkills = computed(() => this.skillCategories().filter((category) => category.type === 'hard'));
  readonly softSkills = computed(() => this.skillCategories().filter((category) => category.type === 'soft'));
  readonly apiStatusLabel = computed(() => {
    switch (this.apiStatus()) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      default:
        return 'Checking';
    }
  });

  readonly primaryActions: CallToAction[] = [
    {
      label: 'View All Projects',
      href: '/projects',
      iconLabel: 'PR',
      type: 'route'
    },
    {
      label: 'Get In Touch',
      href: '/contact',
      iconLabel: 'HI',
      type: 'route'
    }
  ];

  async load(minimumDelayMs = 0): Promise<void> {
    if (this.loaded() || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.apiStatus.set('checking');

    const [payloadResult] = await Promise.allSettled([firstValueFrom(this.fetchPortfolioData()), wait(minimumDelayMs)]);

    if (payloadResult.status === 'fulfilled') {
      this.applyPayload(payloadResult.value);
      this.apiStatus.set('online');
      this.loaded.set(true);
      this.loading.set(false);
      return;
    }

    this.apiStatus.set('offline');
    this.error.set('Unable to load portfolio data right now.');
    this.loaded.set(false);
    this.loading.set(false);
    await this.router.navigateByUrl('/unavailable', { replaceUrl: true });
  }

  async retryLoad(minimumDelayMs = 0): Promise<boolean> {
    this.loaded.set(false);
    await this.load(minimumDelayMs);
    return this.loaded();
  }

  getFeaturedProjects(limit = 4): Project[] {
    const explicitFeatured = this.projects().filter((project) => project.featured);

    if (explicitFeatured.length > 0) {
      return explicitFeatured.slice(0, limit);
    }

    return selectFeaturedProjects(this.projects(), limit);
  }

  getProjectsByTag(tag: string): Project[] {
    return filterProjectsByTag(this.projects(), tag);
  }

  getQuickStats(): StatItem[] {
    const categories = this.projects().reduce<Map<string, number>>((counts, project) => {
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
      return counts;
    }, new Map<string, number>());

    const topCategories = Array.from(categories.entries())
      .sort((left, right) => right[1] - left[1])
      .slice(0, 3)
      .map(([category]) => category);

    return [...this.profile().funFacts];
  }

  createDefaultContextPanelState(): ContextPanelState {
    return {
      eyebrow: 'Context Panel',
      title: 'Start with featured work',
      description: 'Use a prompt or browse the latest highlights, background, and quick stats while you explore.',
      widgets: [
        {
          id: 'default-about',
          type: 'about',
          title: 'About Naren',
          profile: this.profile()
        },
        {
          id: 'default-projects',
          type: 'featured-projects',
          title: 'Featured Projects',
          description: 'A quick set of projects spanning dashboards, portals, and mobile apps.',
          projects: this.getFeaturedProjects(3)
        },
        {
          id: 'default-stats',
          type: 'quick-stats',
          title: 'Quick Snapshot',
          stats: this.getQuickStats().slice(0, 3)
        }
      ],
      actions: this.primaryActions
    };
  }

  createProjectsContextPanelState(title: string, description: string, projects: Project[]): ContextPanelState {
    return {
      eyebrow: 'Project Context',
      title,
      description,
      widgets: [
        {
          id: 'projects-widget',
          type: 'featured-projects',
          title: 'Featured selection',
          description: 'A tighter look at representative builds across dashboards, portals, and mobile delivery.',
          projects: projects.slice(0, 4)
        },
        {
          id: 'projects-skills',
          type: 'skills',
          title: 'Core Stack',
          description: 'The technologies that show up most often across these builds.',
          skills: this.hardSkills().slice(0, 3)
        }
      ],
      actions: this.primaryActions
    };
  }

  createSkillsContextPanelState(): ContextPanelState {
    return {
      eyebrow: 'Skills Context',
      title: 'Technology map',
      description: 'A grouped view of the technical stack, delivery habits, and collaboration strengths behind the work.',
      widgets: [
        {
          id: 'skills-widget',
          type: 'skills',
          title: 'Grouped Skills',
          skills: this.skillCategories()
        },
        {
          id: 'skills-stats',
          type: 'quick-stats',
          title: 'Snapshot',
          stats: this.getQuickStats().slice(0, 3)
        }
      ],
      actions: this.primaryActions
    };
  }

  createExperienceContextPanelState(): ContextPanelState {
    return {
      eyebrow: 'Experience Context',
      title: 'Platform engineering lens',
      description:
        'The throughline here is product delivery: UI quality supported by API integration, release awareness, and operational empathy.',
      widgets: [
        {
          id: 'experience-about',
          type: 'about',
          title: 'Role Summary',
          profile: this.profile()
        },
        {
          id: 'experience-stats',
          type: 'quick-stats',
          title: 'Operating Range',
          stats: this.getQuickStats()
        }
      ],
      actions: this.primaryActions
    };
  }

  createEducationContextPanelState(): ContextPanelState {
    return {
      eyebrow: 'Education Context',
      title: 'Academic foundation',
      description: 'Formal study paired with years of practical delivery across product teams.',
      widgets: [
        {
          id: 'education-widget',
          type: 'education',
          title: 'Education',
          education: this.education()
        },
        {
          id: 'education-stats',
          type: 'quick-stats',
          title: 'Quick Stats',
          stats: this.getQuickStats().slice(0, 2)
        }
      ],
      actions: this.primaryActions
    };
  }

  createAboutContextPanelState(): ContextPanelState {
    return {
      eyebrow: 'About Context',
      title: 'Who Naren is',
      description: 'A concise profile view with availability, background, and quick credibility markers.',
      widgets: [
        {
          id: 'about-profile',
          type: 'about',
          title: 'Profile',
          profile: this.profile()
        },
        {
          id: 'about-stats',
          type: 'quick-stats',
          title: 'Signals',
          stats: this.getQuickStats()
        }
      ],
      actions: this.primaryActions
    };
  }

  createContactContextPanelState(): ContextPanelState {
    const actions = this.profile().email
      ? [
          {
            label: 'Email Naren',
            href: `mailto:${this.profile().email}`,
            iconLabel: 'EM',
            type: 'mailto' as const
          },
          ...this.primaryActions
        ]
      : this.primaryActions;

    return {
      eyebrow: 'Contact Context',
      title: 'Ways to connect',
      description: 'The fastest route is email, but the site also points you toward projects and background context.',
      widgets: [
        {
          id: 'contact-about',
          type: 'about',
          title: 'Contact Snapshot',
          profile: this.profile()
        },
        {
          id: 'contact-stats',
          type: 'quick-stats',
          title: 'Quick Signals',
          stats: this.getQuickStats().slice(0, 2)
        }
      ],
      actions
    };
  }

  private fetchPortfolioData() {
    return this.http
      .get<DataEnvelope<Partial<PortfolioApiPayload>> | Partial<PortfolioApiPayload>>(`${this.apiBase}/all`)
      .pipe(map((response) => normalizePortfolioApiPayload(unwrapData(response))));
  }

  private applyPayload(payload: PortfolioApiPayload): void {
    this.projects.set(payload.projects);
    this.experience.set(payload.experience);
    this.skillCategories.set(payload.skills);
    this.education.set(payload.education);
    this.services.set(payload.services);
    this.profile.set(this.buildProfile(payload));
    this.promptSuggestions.set(
      payload.additional.promptSuggestions?.length ? payload.additional.promptSuggestions : DEFAULT_PROMPT_SUGGESTIONS
    );
    this.recentConversations.set(
      payload.additional.recentConversations?.length ? payload.additional.recentConversations : DEFAULT_RECENT_CONVERSATIONS
    );
  }

  private buildProfile(payload: PortfolioApiPayload): PersonalProfile {
    const mergedProfile: Partial<PersonalProfile> = {
      ...EMPTY_PROFILE,
      ...payload.additional,
      ...payload.contact
    };
    const website = normalizeUrl(mergedProfile.website || EMPTY_PROFILE.website);
    const email = mergedProfile.email || EMPTY_PROFILE.email;
    const fullName =
      firstNonEmptyString(
        mergedProfile.fullName,
        mergedProfile.name,
        joinNameParts(mergedProfile.firstName, mergedProfile.lastName)
      ) || EMPTY_PROFILE.fullName;
    const location =
      firstNonEmptyString(mergedProfile.location, mergedProfile.address, EMPTY_PROFILE.location) || EMPTY_PROFILE.location;
    const socialLinks = mergeProfileSocialLinks(mergedProfile.socialLinks ?? [], website, email);

    return {
      name: fullName || EMPTY_PROFILE.name,
      role: mergedProfile.role || EMPTY_PROFILE.role,
      location,
      email: email || EMPTY_PROFILE.email,
      phone: firstNonEmptyString(mergedProfile.phone, EMPTY_PROFILE.phone),
      website,
      availability: firstNonEmptyString(mergedProfile.availability, EMPTY_PROFILE.availability),
      summary: firstNonEmptyString(mergedProfile.summary, mergedProfile.shortBio, EMPTY_PROFILE.summary),
      fullName,
      firstName: firstNonEmptyString(mergedProfile.firstName, EMPTY_PROFILE.firstName),
      lastName: firstNonEmptyString(mergedProfile.lastName, EMPTY_PROFILE.lastName),
      dob: firstNonEmptyString(mergedProfile.dob, EMPTY_PROFILE.dob),
      nationality: firstNonEmptyString(mergedProfile.nationality, EMPTY_PROFILE.nationality),
      address: firstNonEmptyString(mergedProfile.address, location, EMPTY_PROFILE.address),
      languages: firstNonEmptyString(mergedProfile.languages, EMPTY_PROFILE.languages),
      shortBio: firstNonEmptyString(mergedProfile.shortBio, mergedProfile.summary, EMPTY_PROFILE.shortBio),
      longBio: mergedProfile.longBio || EMPTY_PROFILE.longBio,
      avatarImage: mergedProfile.avatarImage || EMPTY_PROFILE.avatarImage,
      resumeHref: mergedProfile.resumeHref || EMPTY_PROFILE.resumeHref,
      socialLinks,
      funFacts: payload.stats.length ? payload.stats : (mergedProfile.funFacts ?? [])
    };
  }
}

const EMPTY_PROFILE: PersonalProfile = {
  name: '',
  role: '',
  location: '',
  email: '',
  phone: '',
  website: '',
  availability: '',
  summary: '',
  fullName: '',
  firstName: '',
  lastName: '',
  dob: '',
  nationality: '',
  address: '',
  languages: '',
  shortBio: '',
  longBio: '',
  avatarImage: 'assets/img/profile.jpg',
  resumeHref: '/Naren-Edpuganti-Resume.txt',
  socialLinks: [],
  funFacts: []
};

function normalizePortfolioApiPayload(payload: Partial<PortfolioApiPayload> | Record<string, unknown>): PortfolioApiPayload {
  const root = asRecord(payload);

  return {
    contact: normalizeProfile(root),
    skills: normalizeSkillCategories(root['skills']),
    experience: normalizeExperienceItems(root['experience']),
    education: normalizeEducationItems(root['education']),
    projects: normalizeProjects(root['projects']),
    services: normalizeServices(root['services']),
    stats: normalizeStats(root['stats']),
    additional: normalizeAdditional(root['additional'])
  };
}

function normalizeProfile(payload: Record<string, unknown>): Partial<PersonalProfile> {
  const summary = asRecord(payload['summary']);
  const professional = asRecord(summary['professional']);
  const bios = asRecord(summary['bios']);
  const contact = asRecord(payload['contact']);
  const firstName = firstNonEmptyString(summary['firstName'], contact['firstName']);
  const lastName = firstNonEmptyString(summary['lastName'], contact['lastName']);
  const fullName = firstNonEmptyString(
    summary['fullName'],
    contact['fullName'],
    summary['name'],
    contact['name'],
    joinNameParts(firstName, lastName)
  );

  return {
    name: fullName,
    fullName,
    firstName,
    lastName,
    dob: firstNonEmptyString(summary['dob'], contact['dob']),
    nationality: firstNonEmptyString(summary['nationality'], contact['nationality']),
    role: firstNonEmptyString(professional['role'], summary['role'], contact['role']),
    location: normalizeOptionalText(firstNonEmptyString(contact['location'], contact['address'], contact['city'])),
    email: asString(contact['email']),
    phone: firstNonEmptyString(contact['phone'], contact['phoneNumber']),
    website: normalizeUrl(asString(contact['website'])),
    availability: firstNonEmptyString(professional['availability'], summary['availability'], contact['availability']),
    summary: firstNonEmptyString(bios['summary'], summary['summary'], contact['summary']),
    address: normalizeOptionalText(firstNonEmptyString(contact['address'], contact['location'])),
    languages: normalizeLanguageList(firstArray(summary['languages'], contact['languages']) ?? []),
    shortBio: firstNonEmptyString(bios['short'], summary['shortBio'], contact['shortBio']),
    longBio: firstNonEmptyString(bios['long'], summary['longBio'], contact['longBio']),
    avatarImage: normalizeAssetPath(asString(contact['avatarImage'])),
    resumeHref: normalizeDocumentPath(asString(contact['resumeHref'])),
    socialLinks: normalizeSocialLinks(firstArray(summary['socialLinks'], summary['socials'], contact['socialLinks']))
  };
}

function normalizeSkillCategories(value: unknown): SkillCategory[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord).map((item, index) => normalizeSkillCategory(item, index));
  }

  if (!isRecord(value)) {
    return [];
  }

  const categories = value['categories'] ?? value['skillCategories'] ?? value['items'] ?? value['results'];
  if (Array.isArray(categories)) {
    return normalizeSkillCategories(categories);
  }

  const hardSkills = firstArray(value['hardSkills'], value['hard']);
  const softSkills = firstArray(value['softSkills'], value['soft']);

  if (hardSkills || softSkills) {
    const normalized: SkillCategory[] = [];

    if (hardSkills) {
      normalized.push({
        id: 'hard-skills',
        title: 'Hard Skills',
        type: 'hard',
        description: 'Technical tools, languages, and frameworks.',
        skills: normalizeSkillItems(hardSkills),
        groups: normalizeSkillGroups(hardSkills)
      });
    }

    if (softSkills) {
      normalized.push({
        id: 'soft-skills',
        title: 'Soft Skills',
        type: 'soft',
        description: 'Collaboration, communication, and delivery strengths.',
        skills: normalizeSkillItems(softSkills),
        groups: normalizeSkillGroups(softSkills)
      });
    }

    return normalized;
  }

  return [];
}

function normalizeSkillCategory(value: Record<string, unknown>, index: number): SkillCategory {
  const title = asString(value['title']) || asString(value['name']) || `Skill Group ${index + 1}`;
  const rawType = asString(value['type']).toLowerCase();

  return {
    id: asString(value['id']) || slugify(title),
    title,
    type: rawType === 'soft' ? 'soft' : 'hard',
    description: asString(value['description']),
    skills: normalizeSkillItems(firstArray(value['skills'], value['items'], value['values']) ?? []),
    groups: normalizeSkillGroups(firstArray(value['skills'], value['items'], value['values']) ?? [])
  };
}

function normalizeSkillItems(value: unknown[]): SkillCategory['skills'] {
  return sortSkillItems(
    value
      .flatMap((item) => normalizeSkillItem(item))
      .filter((item, index, items) => items.findIndex((candidate) => candidate.name === item.name) === index)
  );
}

function normalizeSkillGroups(value: unknown[]): SkillCategory['groups'] {
  const groups = value
    .flatMap((item, index) => normalizeSkillGroup(item, index))
    .filter((group, index, items) => items.findIndex((candidate) => candidate.id === group.id) === index);

  return groups.length ? groups : undefined;
}

function normalizeSkillGroup(value: unknown, index: number): NonNullable<SkillCategory['groups']> {
  if (Array.isArray(value)) {
    return value.flatMap((item, nestedIndex) => normalizeSkillGroup(item, nestedIndex));
  }

  if (!isRecord(value)) {
    return [];
  }

  const nestedValues = firstArray(value['skills'], value['items'], value['values']);
  if (!nestedValues) {
    return [];
  }

  const title = firstNonEmptyString(value['title'], value['name'], value['label']);
  const description = asString(value['description']);
  const skills = normalizeDirectSkillItems(nestedValues);
  const groups = normalizeSkillGroups(nestedValues);

  if (!title && !description && skills.length === 0 && !groups?.length) {
    return [];
  }

  if (!title && !description && skills.length === 0 && groups?.length) {
    return groups;
  }

  return [
    {
      id: asString(value['id']) || slugify(title || `skill-group-${index + 1}`),
      title: title || undefined,
      description: description || undefined,
      skills,
      groups
    }
  ];
}

function normalizeDirectSkillItems(value: unknown[]): SkillCategory['skills'] {
  return sortSkillItems(
    value
      .flatMap((item) => normalizeDirectSkillItem(item))
      .filter((item, index, items) => items.findIndex((candidate) => candidate.name === item.name) === index)
  );
}

function normalizeDirectSkillItem(value: unknown): SkillCategory['skills'] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeDirectSkillItem(item));
  }

  if (typeof value === 'string') {
    return splitSkillNames(value).map((name) => ({
      name,
      proficiency: 'Strong' as const
    }));
  }

  if (!isRecord(value)) {
    return [];
  }

  if (firstArray(value['skills'], value['items'], value['values'])) {
    return [];
  }

  const name = asString(value['name']) || asString(value['label']) || asString(value['title']);
  if (!name) {
    return [];
  }

  return splitSkillNames(name).map((itemName) => ({
    name: itemName,
    proficiency: normalizeSkillProficiency(value['proficiency'] ?? value['level'] ?? value['strength'] ?? value['progress'])
  }));
}

function normalizeSkillItem(value: unknown): SkillCategory['skills'] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeSkillItem(item));
  }

  if (typeof value === 'string') {
    return splitSkillNames(value).map((name) => ({
      name,
      proficiency: 'Strong' as const
    }));
  }

  if (!isRecord(value)) {
    return [];
  }

  const nestedSkills = firstArray(value['skills'], value['items'], value['values']);
  if (nestedSkills) {
    const nestedProficiency = normalizeSkillProficiency(value['proficiency'] ?? value['level'] ?? value['strength'] ?? value['progress']);

    return nestedSkills.flatMap((item) => normalizeSkillItemWithProficiency(item, nestedProficiency));
  }

  const name = asString(value['name']) || asString(value['label']) || asString(value['title']);
  if (!name) {
    return [];
  }

  return splitSkillNames(name).map((itemName) => ({
    name: itemName,
    proficiency: normalizeSkillProficiency(value['proficiency'] ?? value['level'] ?? value['strength'] ?? value['progress'])
  }));
}

function normalizeSkillItemWithProficiency(
  value: unknown,
  proficiency: SkillCategory['skills'][number]['proficiency']
): SkillCategory['skills'] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeSkillItemWithProficiency(item, proficiency));
  }

  if (typeof value === 'string') {
    return splitSkillNames(value).map((name) => ({
      name,
      proficiency
    }));
  }

  if (!isRecord(value)) {
    return [];
  }

  const nestedSkills = firstArray(value['skills'], value['items'], value['values']);
  if (nestedSkills) {
    const nestedProficiency = value['proficiency'] ?? value['level'] ?? value['strength'] ?? value['progress'];
    return nestedSkills.flatMap((item) =>
      normalizeSkillItemWithProficiency(item, nestedProficiency === undefined ? proficiency : normalizeSkillProficiency(nestedProficiency))
    );
  }

  const name = asString(value['name']) || asString(value['label']) || asString(value['title']);
  if (!name) {
    return [];
  }

  const resolvedProficiency =
    value['proficiency'] === undefined && value['level'] === undefined && value['strength'] === undefined && value['progress'] === undefined
      ? proficiency
      : normalizeSkillProficiency(value['proficiency'] ?? value['level'] ?? value['strength'] ?? value['progress']);

  return splitSkillNames(name).map((itemName) => ({
    name: itemName,
    proficiency: resolvedProficiency
  }));
}

function normalizeSkillProficiency(value: unknown): SkillCategory['skills'][number]['proficiency'] {
  if (typeof value === 'number') {
    if (value >= 90) {
      return 'Expert';
    }

    if (value >= 75) {
      return 'Advanced';
    }

    if (value >= 60) {
      return 'Strong';
    }

    return 'Working';
  }

  const normalized = asString(value).toLowerCase();

  switch (normalized) {
    case 'expert':
      return 'Expert';
    case 'advanced':
      return 'Advanced';
    case 'working':
      return 'Working';
    default:
      return 'Strong';
  }
}

function sortSkillItems(items: SkillCategory['skills']): SkillCategory['skills'] {
  const order: Record<SkillCategory['skills'][number]['proficiency'], number> = {
    Expert: 0,
    Advanced: 1,
    Strong: 2,
    Working: 3
  };

  return [...items].sort((left, right) => order[left.proficiency] - order[right.proficiency] || left.name.localeCompare(right.name));
}

function normalizeExperienceItems(value: unknown): ExperienceItem[] {
  return asArray<Record<string, unknown>>(value)
    .filter(isRecord)
    .map((item, index) => normalizeExperienceItem(item, index));
}

function normalizeExperienceItem(value: Record<string, unknown>, index: number): ExperienceItem {
  const company = firstNonEmptyString(value['company'], value['where']) || 'Professional Experience';
  const role = firstNonEmptyString(value['role'], value['name'], value['title']) || `Role ${index + 1}`;
  const duration = firstNonEmptyString(value['duration'], value['when'], value['date']) || 'Recent';
  const summary = firstNonEmptyString(value['summary'], value['description']) || 'Product-facing engineering and delivery work.';
  const bullets = normalizeStringList(value['bullets']);
  const technologies = normalizeStringList(firstArray(value['technologies'], value['techStack'], value['skills']) ?? []).length
    ? normalizeStringList(firstArray(value['technologies'], value['techStack'], value['skills']) ?? [])
    : parseDelimitedList(asString(value['description']));

  return {
    id: asString(value['id']) || slugify(`${company}-${role}-${duration}-${index + 1}`),
    company,
    role,
    duration,
    location: normalizeOptionalText(firstNonEmptyString(value['location'], value['address'])),
    summary,
    bullets,
    technologies
  };
}

function normalizeEducationItems(value: unknown): EducationItem[] {
  return asArray<Record<string, unknown>>(value)
    .filter(isRecord)
    .map((item, index) => normalizeEducationItem(item, index));
}

function normalizeEducationItem(value: Record<string, unknown>, index: number): EducationItem {
  const institution = firstNonEmptyString(value['institution'], value['where']) || 'Education';
  const degree = firstNonEmptyString(value['degree'], value['name'], value['title']) || `Program ${index + 1}`;
  const duration = firstNonEmptyString(value['duration'], value['when'], value['date']) || 'Recent';
  const summary = firstNonEmptyString(value['summary'], value['description']) || 'Academic foundation and hands-on project work.';
  const focusAreas = normalizeStringList(value['focusAreas']).length
    ? normalizeStringList(value['focusAreas'])
    : inferEducationFocusAreas(summary);

  return {
    id: asString(value['id']) || slugify(`${institution}-${degree}-${duration}-${index + 1}`),
    institution,
    degree,
    duration,
    location: normalizeOptionalText(firstNonEmptyString(value['location'], value['address'])),
    summary,
    focusAreas,
    link: normalizeUrl(firstNonEmptyString(value['link'], value['url']))
  };
}

function normalizeProjects(value: unknown): Project[] {
  return asArray<Record<string, unknown>>(value)
    .filter(isRecord)
    .map((item, index) => normalizeProject(item, index));
}

function normalizeProject(value: Record<string, unknown>, index: number): Project {
  const title = asString(value['title'] ?? value['name']) || `Project ${index + 1}`;
  const category = normalizeProjectCategory(value['category']);
  const shortDescription = asString(value['shortDescription'] ?? value['summary'] ?? value['description']) || 'Product and engineering delivery.';
  const linkUrl = normalizeUrl(asString(value['url'] ?? value['link']));
  const industries = normalizeStringList(value['industries']);
  const techStack = normalizeStringList(firstArray(value['techStack'], value['technologies'], value['technology'], value['stack']) ?? []);
  const featured = value['featured'] === true;

  return {
    id: asString(value['id']) || slugify(`${title}-${index + 1}`),
    title,
    category,
    shortDescription,
    longDescription: asString(value['longDescription'] ?? value['description'] ?? value['summary']) || shortDescription,
    techStack,
    industries,
    previewImage: normalizeAssetPath(asString(value['previewImage'] ?? value['image'])),
    badges: normalizeProjectBadges(value['badges'], category),
    featured,
    client: asString(value['client'] ?? value['company']) || 'Selected Work',
    year: asString(value['year'] ?? value['date']),
    links: linkUrl
      ? [
          {
            label: linkUrl.includes('github.com') ? 'View Source' : 'Preview',
            url: linkUrl,
            kind: detectProjectLinkKind(linkUrl)
          }
        ]
      : []
  };
}

function normalizeServices(value: unknown): ServiceItem[] {
  return asArray<Record<string, unknown>>(value)
    .filter(isRecord)
    .map((item, index) => normalizeService(item, index));
}

function normalizeService(value: Record<string, unknown>, index: number): ServiceItem {
  const title = firstNonEmptyString(value['title'], value['name']) || `Service ${index + 1}`;
  const capabilities = normalizeStringList(firstArray(value['capabilities'], value['types'], value['items']) ?? []);

  return {
    id: asString(value['id']) || slugify(title),
    title,
    summary:
      firstNonEmptyString(value['summary'], value['description']) ||
      (capabilities.length
        ? `Includes ${joinWithAnd(capabilities.slice(0, 3))}${capabilities.length > 3 ? ', and more.' : '.'}`
        : 'Delivery across product engineering and supporting systems.'),
    capabilities
  };
}

function normalizeStats(value: unknown): StatItem[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord).map((item) => normalizeStatItem(item, ''));
  }

  const statsRecord = asRecord(value);
  const summary = firstNonEmptyString(statsRecord['summary'], statsRecord['description']);
  const statItems = firstArray(statsRecord['stats'], statsRecord['items'], statsRecord['results']);

  if (statItems) {
    return statItems.filter(isRecord).map((item) => normalizeStatItem(item, summary));
  }

  const yearsExperience = statsRecord['yearsExperience'];
  if (typeof yearsExperience === 'number') {
    return [
      {
        label: 'Years Experience',
        value: `${yearsExperience}+`,
        hint: summary || 'Professional delivery across frontend, mobile, and platform-aware product work.'
      }
    ];
  }

  return [];
}

function normalizeStatItem(value: Record<string, unknown>, fallbackHint: string): StatItem {
  return {
    label: firstNonEmptyString(value['label'], value['name']) || 'Stat',
    value: asString(value['value']) || '0',
    hint: firstNonEmptyString(value['hint'], value['description']) || fallbackHint
  };
}

function normalizeAdditional(value: unknown): Partial<PortfolioAdditionalData> {
  const additional = asRecord(value);

  return {
    socialLinks: normalizeSocialLinks(additional['socialLinks']),
    promptSuggestions: normalizePromptSuggestions(additional['promptSuggestions']),
    recentConversations: normalizeRecentConversations(additional['recentConversations'])
  };
}

function normalizePromptSuggestions(value: unknown): PromptSuggestion[] | undefined {
  const suggestions = asArray<Record<string, unknown>>(value)
    .filter(isRecord)
    .map((item, index) => {
      const label = firstNonEmptyString(item['label'], item['title'], item['text']);
      const prompt = firstNonEmptyString(item['prompt'], item['value'], item['query'], item['text']);

      if (!label || !prompt) {
        return null;
      }

      return {
        id: asString(item['id']) || slugify(`${label}-${index + 1}`),
        label,
        description: firstNonEmptyString(item['description'], item['subtitle']) || label,
        iconLabel: asString(item['iconLabel']) || 'PR',
        intent: 'overview',
        prompt
      };
    })
    .filter((item): item is PromptSuggestion => item !== null);

  return suggestions.length ? suggestions : undefined;
}

function normalizeRecentConversations(value: unknown): RecentConversation[] | undefined {
  const conversations = asArray<Record<string, unknown>>(value)
    .filter(isRecord)
    .map((item, index) => {
      const prompt = firstNonEmptyString(item['prompt'], item['query'], item['value']);
      const label = firstNonEmptyString(item['label'], item['title']) || prompt;

      if (!prompt || !label) {
        return null;
      }

      return {
        id: asString(item['id']) || slugify(`${label}-${index + 1}`),
        label,
        prompt
      };
    })
    .filter((item): item is RecentConversation => item !== null);

  return conversations.length ? conversations : undefined;
}

function normalizeSocialLinks(value: unknown): PersonalProfile['socialLinks'] {
  return asArray<Record<string, unknown>>(value)
    .filter(isRecord)
    .map((item) => {
      const label = firstNonEmptyString(item['label'], item['name'], item['title']);
      const url = normalizeUrl(firstNonEmptyString(item['url'], item['href']));

      if (!label || !url) {
        return null;
      }

      return {
        label,
        url,
        iconLabel: asString(item['iconLabel']) || inferSocialIconLabel(label, url)
      };
    })
    .filter((item): item is PersonalProfile['socialLinks'][number] => item !== null);
}

function mergeProfileSocialLinks(
  existingLinks: PersonalProfile['socialLinks'],
  website: string,
  email: string
): PersonalProfile['socialLinks'] {
  const appendedLinks = [
    website
      ? {
          label: 'Website',
          url: website,
          iconLabel: 'WB'
        }
      : null,
    email
      ? {
          label: 'Email',
          url: `mailto:${email}`,
          iconLabel: 'EM'
        }
      : null
  ].filter((item): item is PersonalProfile['socialLinks'][number] => item !== null);

  return [...existingLinks, ...appendedLinks].filter(
    (item, index, items) =>
      items.findIndex(
        (candidate) => candidate.url.toLowerCase() === item.url.toLowerCase() || candidate.label.toLowerCase() === item.label.toLowerCase()
      ) === index
  );
}

function inferSocialIconLabel(label: string, url: string): string {
  const normalized = `${label} ${url}`.toLowerCase();

  if (normalized.includes('github')) {
    return 'GH';
  }

  if (normalized.includes('instagram')) {
    return 'IG';
  }

  if (normalized.includes('mail')) {
    return 'EM';
  }

  if (normalized.includes('linkedin')) {
    return 'IN';
  }

  return 'WB';
}

function normalizeProjectCategory(value: unknown): Project['category'] {
  const normalized = asString(value).toLowerCase();

  switch (normalized) {
    case 'mobile':
      return 'Mobile';
    case 'portal':
      return 'Portal';
    case 'dashboard':
      return 'Dashboard';
    case 'website':
    case 'web':
      return 'Website';
    case 'ai/ml':
    case 'aiml':
    case 'ai':
    case 'ml':
    case 'genai':
      return 'AI/ML';
    default:
      return (titleCase(asString(value)) || 'Website') as Project['category'];
  }
}

function normalizeProjectBadges(value: unknown, category: Project['category']): string[] {
  const badges = normalizeStringList(value);
  return badges.length ? badges : [category];
}

function detectProjectLinkKind(url: string): NonNullable<Project['links']>[number]['kind'] {
  if (url.includes('apps.apple.com')) {
    return 'app-store';
  }

  if (url.includes('play.google.com')) {
    return 'play-store';
  }

  if (url.includes('github.com')) {
    return 'case-study';
  }

  return 'live';
}

function inferEducationFocusAreas(summary: string): string[] {
  const focusedSection = summary.toLowerCase().includes('focus on')
    ? summary.slice(summary.toLowerCase().indexOf('focus on') + 'focus on'.length).split('.')[0]
    : '';

  const parsedFocus = parseDelimitedList(focusedSection);
  if (parsedFocus.length) {
    return parsedFocus;
  }

  const keywords = ['.NET', 'C#', 'SQL Server', 'Software Development', 'Web Technologies', 'Web Portal Development'];
  return keywords.filter((keyword) => summary.toLowerCase().includes(keyword.toLowerCase()));
}

function firstArray(...values: unknown[]): unknown[] | null {
  for (const value of values) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  return null;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'number' || typeof value === 'bigint') {
    return String(value);
  }

  return '';
}

function normalizeStringList(value: unknown): string[] {
  return asArray<unknown>(value)
    .map((item) => normalizeOptionalText(asString(item)))
    .filter((item): item is string => !!item);
}

function splitSkillNames(value: string): string[] {
  const items: string[] = [];
  let current = '';
  let depth = 0;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    const nextThreeChars = value.slice(index, index + 5).toLowerCase();

    if (character === '(') {
      depth += 1;
      current += character;
      continue;
    }

    if (character === ')') {
      depth = Math.max(0, depth - 1);
      current += character;
      continue;
    }

    if (depth === 0 && (character === '/' || character === ',')) {
      const normalized = normalizeOptionalText(current);
      if (normalized) {
        items.push(normalized);
      }

      current = '';
      continue;
    }

    if (depth === 0 && nextThreeChars === ' and ') {
      const normalized = normalizeOptionalText(current);
      if (normalized) {
        items.push(normalized);
      }

      current = '';
      index += 4;
      continue;
    }

    current += character;
  }

  const normalized = normalizeOptionalText(current);
  if (normalized) {
    items.push(normalized);
  }

  return items;
}

function parseDelimitedList(value: string): string[] {
  return value
    .split(/,|\/|\band\b/gi)
    .map((item) => normalizeOptionalText(item))
    .filter((item): item is string => !!item)
    .filter((item, index, items) => items.indexOf(item) === index);
}

function firstNonEmptyString(...values: unknown[]): string {
  return values.map((value) => normalizeOptionalText(asString(value))).find((value) => !!value) ?? '';
}

function normalizeLanguageList(value: unknown): string {
  const languages = normalizeStringList(value);
  return languages.join(', ');
}

function joinNameParts(firstName: unknown, lastName: unknown): string {
  return [asString(firstName), asString(lastName)]
    .map((value) => normalizeOptionalText(value))
    .filter((value): value is string => !!value)
    .join(' ');
}

function normalizeOptionalText(value: string): string {
  const normalized = value.trim();
  return normalized && normalized.toLowerCase() !== 'n/a' ? normalized : '';
}

function normalizeUrl(value: string): string {
  const normalized = value.trim();
  if (!normalized) {
    return '';
  }

  if (normalized.startsWith('mailto:') || normalized.startsWith('tel:')) {
    return normalized;
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  return `https://${normalized.replace(/^\/+/, '')}`;
}

function normalizeAssetPath(value: string): string {
  const normalized = value.trim().replace(/^src\//, '');

  if (!normalized) {
    return 'assets/img/profile.jpg';
  }

  const aliases: Record<string, string> = {
    'assets/img/projects/aboveo_web.png': 'assets/img/projects/sold_website.png',
    'assets/img/projects/trunow_web.png': 'assets/img/projects/trunow_website.png',
    'assets/img/projects/asa_web.png': 'assets/img/projects/asa_wesite.png'
  };

  return aliases[normalized] ?? normalized;
}

function normalizeDocumentPath(value: string): string {
  const normalized = value.trim().replace(/^src\//, '');

  if (!normalized) {
    return '';
  }

  if (/^https?:\/\//i.test(normalized) || normalized.startsWith('/')) {
    return normalized;
  }

  return `/${normalized.replace(/^\/+/, '')}`;
}

function selectFeaturedProjects(projects: Project[], limit: number): Project[] {
  const featured: Project[] = [];
  const seenIds = new Set<string>();
  const seenCategories = new Set<Project['category']>();

  for (const project of projects) {
    if (featured.length >= limit) {
      break;
    }

    if (!seenCategories.has(project.category)) {
      featured.push(project);
      seenIds.add(project.id);
      seenCategories.add(project.category);
    }
  }

  for (const project of projects) {
    if (featured.length >= limit) {
      break;
    }

    if (!seenIds.has(project.id)) {
      featured.push(project);
      seenIds.add(project.id);
    }
  }

  return featured;
}

function joinWithAnd(items: string[]): string {
  if (items.length <= 1) {
    return items[0] ?? '';
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function titleCase(value: string): string {
  return value.replace(/\w\S*/g, (segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase());
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function unwrapData<T>(response: DataEnvelope<T> | T): T {
  if (isDataEnvelope(response)) {
    return response.data;
  }

  return response;
}

function isDataEnvelope<T>(value: DataEnvelope<T> | T): value is DataEnvelope<T> {
  return typeof value === 'object' && value !== null && 'data' in value;
}

function wait(durationMs: number): Promise<void> {
  if (durationMs <= 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}
