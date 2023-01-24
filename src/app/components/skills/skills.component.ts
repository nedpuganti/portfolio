import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  softSkills = [
    {
      name: 'Leadership',
      progress: 70
    },
    {
      name: 'Teamwork',
      progress: 85
    },
    {
      name: 'Communication',
      progress: 75
    },
    {
      name: 'Problem Solving',
      progress: 90
    }
  ];

  hardSkills = [
    {
      name: 'HTML5 / SASS / CSS / Bootstrap',
      progress: 85
    },
    {
      name: 'Javascript / Angular / React.js / Nodejs',
      progress: 90
    },
    {
      name: 'Mongo / SQL / POSTGRES',
      progress: 70
    },
    {
      name: 'Jenkins / Docker / Kubernetes / Git',
      progress: 80
    }
  ];
}
