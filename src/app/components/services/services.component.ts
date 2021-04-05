import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services: any[] = [
    {
      name: 'Web Development',
      types: [
        'Html',
        'Css/Sass',
        'Bootstrap',
        'Javascript / jQuery / Typescript',
      ],
    },
    {
      name: 'Frontend Development',
      types: ['Angular', 'React js'],
    },
    {
      name: 'Mobile Development',
      types: ['Apache Cordova', 'Ionic Framework', 'React Native', 'Flutter'],
    },
    {
      name: 'Backend Development',
      types: ['Nodejs', 'Nodejs + Nestjs', 'ASP .Net c#', 'Spring + Kotlin'],
    },
    {
      name: 'Database',
      types: ['Mongo', 'Postgres', 'Sql'],
    },
    {
      name: 'DevOps',
      types: ['Jenkins', 'Docker', 'Kubernetes', 'Git'],
    },
    {
      name: 'Cloud',
      types: ['AWS', 'GCP'],
    },
    {
      name: 'Other Tools',
      types: ['ELK Stack', 'Grafana', 'Swagger', 'PostMan', 'VS Code', 'Jira'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
