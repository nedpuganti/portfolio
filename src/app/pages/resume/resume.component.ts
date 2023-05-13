import { Component } from '@angular/core';
import { FunfactsComponent } from '../../components/funfacts/funfacts.component';
import { EducationComponent } from '../../components/education/education.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss'],
    standalone: true,
    imports: [RouterLink, SkillsComponent, EducationComponent, FunfactsComponent]
})
export class ResumeComponent {
  resumeLink = '#';
}
