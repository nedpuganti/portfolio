import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mocksProjects } from '@app/mocks/projects-data.mock';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  getExperienceYearsCount() {
    const startYear = 2014;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }

  getHardSkills() {
    return of([
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
    ]);
  }

  getSoftSkills() {
    return of([
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
    ]);
  }

  getServices() {
    return of([
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
    ]);
  }

  getFunFacts() {
    return of([
      {
        name: 'Years Experience',
        value: this.getExperienceYearsCount()
      },
      {
        name: 'Done Projects',
        value: 40
      },
      {
        name: 'Happy Clients',
        value: 20
      }
    ]);
  }

  getExperiences() {
    return of([
      {
        when: '2016 - Present',
        where: 'Allied Informatics',
        name: 'Full-Stack Frontend Developer',
        description: 'HTML5, CSS3, jQuery, JavaScript, Angular, Ionic, Cordova, Flutter, Material, Agile, REST Services...'
      },
      {
        when: '2014 - 2016',
        where: '',
        name: 'Developer',
        description: 'Premier Cosmetic Surgery, Asa.help ...'
      }
      // {
      //   when: '2016',
      //   where: 'FREELANCE',
      //   name: 'Developer',
      //   description:
      //     'ASA Charity : Used .net c# and sql and completed the website',
      // },
      // {
      //   when: '2014',
      //   where: 'FREELANCE',
      //   name: 'UI Developer',
      //   description:
      //     'Premier Cosmetic Surgery: developed interface using HTML, CSS, jQuery',
      // },
      // {
      //   when: '2012 - 2013',
      //   where: 'PROJECT',
      //   name: 'Developer',
      //   description:
      //     'Used .net c# and sql as technologies and written a web portal for final year project at university',
      // },
    ]);
  }

  getEducations() {
    return of([
      {
        when: '2014 - 2015',
        where: 'USA',
        name: 'Master of Computer Science',
        subName: '(Masters)',
        description: 'University of Tennessee at Chattanooga',
        url: 'https://www.utc.edu/'
      },
      {
        when: '2009 - 2013',
        where: 'India',
        name: "Bachelor's Computer Science",
        subName: '(Engineering)',
        description: 'SRKIT',
        url: 'http://srkit.in/'
      },
      {
        when: '2007 - 2009',
        where: 'India',
        name: 'Secondary Education',
        subName: '(Intermediate)',
        description: 'Sri Chaitanya College',
        url: 'https://srichaitanya.net/'
      },
      {
        when: '2007',
        where: 'India',
        name: 'Primary Education',
        subName: '(School: LKG - 10TH)',
        description: "St. John's High School",
        url: 'http://www.stjohnsgvm.org/'
      }
    ]);
  }

  getProjects(category: string): Observable<any[]> {
    if (category) {
      return of(mocksProjects.filter((el: any) => category === el.category));
    }

    return of(mocksProjects);
  }
}
