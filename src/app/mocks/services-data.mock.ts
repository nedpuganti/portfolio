import { Service } from '@app/interfaces/service.interface';

export const mockServices: Service[] = [
  {
    name: 'UI/Web Development',
    types: ['Html', 'Css/Scss', 'Bootstrap', 'Tailwind']
  },
  {
    name: 'Web/Frontend Development',
    types: ['Javascript / jQuery / Typescript', 'Angular (Angular, Material)', 'React js', 'Nx']
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
    types: ['Jenkins', 'Docker', 'Kubernetes', 'Nginx', 'ArgoCD', 'CertManager']
  },
  {
    name: 'Cloud',
    types: ['AWS (S3, SNS, SQS, SES, etc.)', 'GCP']
  },
  {
    name: 'Testing',
    types: ['Jest', 'Cypress', 'Junit', 'Cucumber']
  },
  {
    name: 'Other Skills',
    types: ['Ajax / RestApi / Graphql', 'Gulp', 'Sequelize / Knex / Hibernate / JPA', 'RabbitMQ / Kafka', 'Redis (Cache)']
  },
  {
    name: 'Other Tools',
    types: ['ELK Stack (Logs)', 'Grafana (Analytics)', 'Swagger', 'Sonar', 'VS Code / IntelliJ', 'Jira', 'Git']
  }
];
