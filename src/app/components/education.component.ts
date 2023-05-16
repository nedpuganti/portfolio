import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-education',
  template: `
    <!-- Education Starts -->
    <div class="education">
      <!-- Education Heading Starts -->
      <h5>Education</h5>
      <!-- Education Heading Ends -->
      <div class="row no-gutters">
        <!-- Single Education Starts -->
        <div class="single-education col-sm-6 col-12" *ngFor="let education of educations$ | async">
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
        <!-- Single Education Ends -->
      </div>
    </div>
    <!-- Education Ends -->
  `,
  styles: [],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class EducationComponent {
  registerService = inject(AppService);

  educations$ = this.registerService.getEducations();
}
