import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppService } from '../app.service';
import { Skill } from '../interfaces/skill.interface';

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
                @for (skill of softSkills$(); track $index) {
                  <li class="single-skill">
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
                        <div class="progress" style="height:40px">
                          <div
                            class="progress-bar progress-bar progress-bar-striped progress-bar-animated"
                            [style]="{ width: skill.progress + '%' }"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </li>
                }
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
                @for (skill of hardSkills$(); track $index) {
                  <li class="single-skill">
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
                        <div class="progress" style="height:40px">
                          <div
                            class="progress-bar progress-bar progress-bar-striped progress-bar-animated"
                            [style]="{ width: skill.progress + '%' }"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </li>
                }
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
  styles: []
})
export class SkillsComponent {
  readonly registerService: AppService = inject(AppService);

  hardSkills$: Signal<Skill[]> = toSignal(this.registerService.getHardSkills(), { initialValue: [] });
  softSkills$: Signal<Skill[]> = toSignal(this.registerService.getSoftSkills(), { initialValue: [] });
}
