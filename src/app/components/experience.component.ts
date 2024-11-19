import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppService } from '../app.service';
import { Experience } from '../interfaces/experience.interface';

@Component({
  selector: 'pfo-experience',
  template: `
    <!-- Experience Starts -->
    <div class="experience">
      <!-- Experience Heading Starts -->
      <h5>Experience</h5>
      <!-- Experience Heading Ends -->
      <div class="row no-gutters">
        <!-- Single Experience Starts -->
        @for (experience of experiences$(); track $index) {
          <div class="single-experience col-sm-6 col-12">
            <ul>
              <li class="experience-when-where">
                <span class="when">{{ experience.when }} </span>
                <span class="where">{{ experience.where }}</span>
              </li>
              <li>
                <ul>
                  <li class="experience-name">
                    <i class="fas fa-angle-double-right"></i><span>{{ experience.name }}</span>
                  </li>
                  <li class="experience-body" [innerHtml]="experience.description"></li>
                </ul>
              </li>
            </ul>
          </div>
        }
        <!-- Single Experience Ends -->
      </div>
    </div>
    <!-- Experience Ends -->
  `,
  styles: []
})
export class ExperienceComponent {
  readonly registerService: AppService = inject(AppService);

  experiences$: Signal<Experience[]> = toSignal(this.registerService.getExperiences(), { initialValue: [] });
}
