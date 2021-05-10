import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services: any[] = [
    {
      name: 'UI/Web Development',
      types: ['Html', 'Css/Scss', 'Bootstrap', 'Tailwind'],
    },
    {
      name: 'Web/Frontend Development',
      types: [
        'Javascript / jQuery / Typescript',
        'Angular (Material, Flex)',
        'React js',
        // 'Python'
      ],
    },
    {
      name: 'Mobile Development',
      types: ['Apache Cordova', 'Ionic Framework', 'React Native', 'Flutter'],
    },
    {
      name: 'Backend Development',
      types: [
        'Nodejs (ExpressJs, Nestjs)',
        'ASP .Net c#',
        'SpringBoot + Kotlin',
      ],
    },
    {
      name: 'Database',
      types: ['Mongo', 'Postgres', 'Sql', 'Sql Server'],
    },
    {
      name: 'DevOps',
      types: ['Jenkins', 'Docker', 'Kubernetes', 'Git'],
    },
    {
      name: 'Cloud',
      types: ['AWS (S3, SNS, SQS, SES)', 'GCP'],
    },
    {
      name: 'Other Skills',
      types: [
        'Ajax / RestApi / Graphql',
        'Gulp',
        'Sequelize / Hibernate / JPA',
        'RabbitMQ / Kafka',
        'Redis (Cache)',
      ],
    },
    {
      name: 'Other Tools',
      types: [
        'ELK Stack (Logs)',
        'Grafana (Analytics)',
        'Swagger',
        'PostMan',
        'VS Code / IntelliJ',
        'Jira',
      ],
    },
    {
      name: 'External',
      types: [
        'Twilio',
        'BridgeDataOut',
        'E-Signatures',
        'SmartyStreets / Usps',
        'GoogleMaps',
        'Etc..',
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
