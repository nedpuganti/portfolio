import { Service } from '@app/interfaces/service.interface';

export const mockServices: Service[] = [
  {
    name: 'UI/Web Development',
    types: ['Html', 'Css/Scss', 'Bootstrap', 'Tailwind']
  },
  {
    name: 'Web/Frontend Development',
    types: [
      'Javascript / jQuery / Typescript',
      'Angular (Material, Flex)',
      'React js'
      // 'Python'
    ]
  },
  {
    name: 'Mobile Development',
    types: ['Apache Cordova', 'Ionic Framework', 'React Native', 'Flutter']
  },
  {
    name: 'Backend Development',
    types: ['Nodejs (ExpressJs, Nestjs)', 'ASP .Net c#', 'SpringBoot + Kotlin']
  },
  {
    name: 'Database',
    types: ['Mongo', 'Postgres', 'Sql', 'Sql Server']
  },
  {
    name: 'DevOps',
    types: ['Jenkins', 'Docker', 'Kubernetes', 'Nginx']
  },
  {
    name: 'Cloud',
    types: ['AWS (S3, SNS, SQS, SES)', 'GCP']
  },
  {
    name: 'Other Skills',
    types: ['Ajax / RestApi / Graphql', 'Gulp', 'Sequelize / Hibernate / JPA', 'RabbitMQ / Kafka', 'Redis (Cache)']
  },
  {
    name: 'Other Tools',
    types: ['ELK Stack (Logs)', 'Grafana (Analytics)', 'Swagger', 'PostMan', 'VS Code / IntelliJ', 'Jira', 'Git']
  },
  {
    name: 'External',
    types: ['Twilio', 'BridgeDataOut', 'E-Signatures', 'SmartyStreets / Usps', 'GoogleMaps', 'Etc..']
  }
];