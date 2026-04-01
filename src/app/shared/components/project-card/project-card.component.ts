import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Project } from '../../../core/models';
import { AppIconComponent } from '../app-icon/app-icon.component';

@Component({
  selector: 'app-project-card',
  imports: [AppIconComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly compact = input(false);

  projectLinkIcon(kind: 'live' | 'app-store' | 'play-store' | 'case-study'): string {
    switch (kind) {
      case 'app-store':
        return 'app-store';
      case 'play-store':
        return 'play-store';
      case 'case-study':
        return 'case-study';
      default:
        return 'preview';
    }
  }
}
