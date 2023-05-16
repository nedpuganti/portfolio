import { Component } from '@angular/core';
import { FunfactsComponent } from '../components/funfacts.component';
import { EducationComponent } from '../components/education.component';
import { SkillsComponent } from '../components/skills.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resume',
  template: `
    <app-skills></app-skills>
    <app-education></app-education>
    <!-- <app-experience></app-experience> -->
    <app-funfacts></app-funfacts>
    <!-- Button Wrapper Starts -->
    <div class="button-wrapper">
      <!-- Single Button Starts -->
      <a [href]="resumeLink" target="_blank">
        <span class="front">
          <i class="fas fa-file-pdf"></i><span class="value">Download <span>Resume</span></span>
        </span>
        <span class="back">
          <i class="fas fa-file-pdf"></i><span class="value">Download <span>Resume</span></span>
        </span>
      </a>
      <!-- Single Button Ends -->
    </div>
    <!-- Button Wrapper Ends -->
  `,
  styles: [],
  standalone: true,
  imports: [RouterLink, SkillsComponent, EducationComponent, FunfactsComponent]
})
export class ResumeComponent {
  resumeLink = '#';
}
