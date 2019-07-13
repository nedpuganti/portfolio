import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ContactformComponent } from './contactform/contactform.component';
import { ContactinfoComponent } from './contactinfo/contactinfo.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { FunfactsComponent } from './funfacts/funfacts.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { SkillsComponent } from './skills/skills.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule,
    RouterModule
  ],
  declarations: [
    PersonalinfoComponent,
    ServicesComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    FunfactsComponent,
    ProjectsComponent,
    ContactinfoComponent,
    ContactformComponent
  ],
  exports: [
    PersonalinfoComponent,
    ServicesComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    FunfactsComponent,
    ProjectsComponent,
    ContactinfoComponent,
    ContactformComponent
  ]
})
export class SharedComponentModule {}
