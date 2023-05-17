import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { AppService } from '@app/app.service';
import { Observable } from 'rxjs';
import { Experience } from '@app/interfaces/experience.interface';

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
        <div class="single-experience col-sm-6 col-12" *ngFor="let experience of experiences$ | async">
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
        <!-- Single Experience Ends -->
      </div>
    </div>
    <!-- Experience Ends -->
  `,
  styles: [],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class ExperienceComponent {
  registerService = inject(AppService);

  experiences$: Observable<Experience[]> = this.registerService.getExperiences();
}
