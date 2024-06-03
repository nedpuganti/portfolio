import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppService } from '../app.service';
import { Education } from '../interfaces/education.interface';

@Component({
  selector: 'pfo-education',
  template: `
    <!-- Education Starts -->
    <div class="education">
      <!-- Education Heading Starts -->
      <h5>Education</h5>
      <!-- Education Heading Ends -->
      <div class="row no-gutters">
        <!-- Single Education Starts -->
        @for (education of educations$(); track $index) {
          <div class="single-education col-sm-6 col-12">
            <ul>
              <li class="education-when-where">
                <span class="when">{{ education.when }} </span>
                <span class="where">{{ education.where }}</span>
              </li>
              <li>
                <ul>
                  <li class="education-name">
                    <i class="fas fa-angle-double-right"></i><span>{{ education.name }}</span
                    ><br />
                    {{ education.subName }}
                  </li>
                  <li class="education-body">
                    <a [href]="education.url" target="_blank" style="color:#a8a8a8">
                      {{ education.description }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        }
        <!-- Single Education Ends -->
      </div>
    </div>
    <!-- Education Ends -->
  `,
  styles: [],
  standalone: true
})
export class EducationComponent {
  readonly registerService = inject(AppService);

  educations$: Signal<Education[]> = toSignal(this.registerService.getEducations(), { initialValue: [] });
}
