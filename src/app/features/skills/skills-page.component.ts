import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { SkillCategory, SkillGroup, SkillItem } from '../../core/models';
import { ChatStateService } from '../../core/services/chat-state.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { SkillPillComponent } from '../../shared/components/skill-pill/skill-pill.component';

@Component({
  selector: 'app-skills-page',
  imports: [SectionTitleComponent, ServiceCardComponent, SkillPillComponent],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsPageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly chatState = inject(ChatStateService);
  readonly hardSkillCategories = computed(() => this.portfolioData.hardSkills());
  readonly softSkillCategories = computed(() => this.portfolioData.softSkills());

  constructor() {
    this.chatState.setContextPanelState(this.portfolioData.createSkillsContextPanelState());
  }

  categorySkillGroups(category: SkillCategory): RenderableSkillGroup[] {
    return flattenSkillGroups(category.groups ?? []);
  }

  skillSections(skills: SkillItem[]): SkillSection[] {
    return buildSkillSections(skills);
  }
}

interface RenderableSkillGroup extends SkillGroup {
  depth: number;
}

interface SkillSection {
  label: SkillItem['proficiency'];
  skills: SkillItem[];
}

function flattenSkillGroups(groups: SkillGroup[], depth = 0): RenderableSkillGroup[] {
  return groups.flatMap((group) => [
    {
      ...group,
      depth
    },
    ...flattenSkillGroups(group.groups ?? [], depth + 1)
  ]);
}

function buildSkillSections(skills: SkillItem[]): SkillSection[] {
  const orderedLabels: SkillItem['proficiency'][] = ['Expert', 'Advanced', 'Strong', 'Working'];

  return orderedLabels
    .map((label) => ({
      label,
      skills: skills.filter((skill) => skill.proficiency === label)
    }))
    .filter((section) => section.skills.length > 0);
}
