import { Component, inject } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, NgFor } from '@angular/common';
import { AppService } from '@app/app.service';
import { Observable } from 'rxjs';
import { Skill } from '@app/interfaces/skill.interface';

@Component({
  selector: 'pfo-skills',
  template: `
    <!-- Skills Starts -->
    <div class="skills">
      <!-- Skills Heading Starts -->
      <h5>Skills</h5>
      <!-- Skills Heading Ends -->
      <div class="row no-gutters">
        <!-- Single Skills Wrapper Starts -->
        <div class="single-skills-wrapper col-12 col-sm-6">
          <ul>
            <!-- Skills Heading Starts -->
            <li class="skills-heading">
              <span class="first-word">Soft </span>
              <span class="second-word">Skills</span>
            </li>
            <!-- Skills Heading Ends -->
            <li>
              <ul>
                <!-- Single Skill Starts -->
                <li class="single-skill" *ngFor="let skill of softSkills$ | async">
                  <ul>
                    <li class="skill-name">
                      <i class="fas fa-angle-double-right"></i><span>{{ skill.name }}</span>
                    </li>
                    <!-- Range Of Percentage 0% - 100% -->
                    <li class="percentage">{{ skill.progress }}%</li>
                    <!-- <li class="progress-wrapper"> -->
                    <!-- <span class="progress"></span> -->
                    <!-- </li> -->

                    <li>
                      <ngb-progressbar [value]="skill.progress" [striped]="true" [animated]="true" [height]="'40px'"> </ngb-progressbar>
                    </li>
                  </ul>
                </li>
                <!-- Single Skill Ends -->
              </ul>
            </li>
          </ul>
        </div>
        <!-- Single Skills Wrapper Ends -->
        <!-- Single Skills Wrapper Starts -->
        <div class="single-skills-wrapper col-12 col-sm-6">
          <ul>
            <!-- Skills Heading Starts -->
            <li class="skills-heading">
              <span class="first-word">Hard </span>
              <span class="second-word">Skills</span>
            </li>
            <!-- Skills Heading Ends -->
            <li>
              <ul>
                <!-- Single Skill Starts -->
                <li class="single-skill" *ngFor="let skill of hardSkills$ | async">
                  <ul>
                    <li class="skill-name">
                      <i class="fas fa-angle-double-right"></i><span>{{ skill.name }}</span>
                    </li>
                    <!-- Range Of Percentage 0% - 100% -->
                    <li class="percentage">{{ skill.progress }}%</li>
                    <!-- <li class="progress-wrapper"> -->
                    <!-- <span class="progress"></span> -->
                    <!-- </li> -->

                    <li>
                      <ngb-progressbar [value]="skill.progress" [striped]="true" [animated]="true" [height]="'40px'"> </ngb-progressbar>
                    </li>
                  </ul>
                </li>
                <!-- Single Skill Ends -->
              </ul>
            </li>
          </ul>
        </div>
        <!-- Single Skills Wrapper Ends -->
      </div>
    </div>
    <!-- Skills Ends -->
  `,
  styles: [],
  standalone: true,
  imports: [NgFor, NgbProgressbar, AsyncPipe]
})
export class SkillsComponent {
  registerService = inject(AppService);

  hardSkills$: Observable<Skill[]> = this.registerService.getHardSkills();
  softSkills$: Observable<Skill[]> = this.registerService.getSoftSkills();
}
