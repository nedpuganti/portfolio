import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [
    {
      when: '2016 - Present',
      where: 'Allied Informatics',
      name: 'Full-Stack Frontend Developer',
      description:
        'HTML5, CSS3, jQuery, JavaScript, Angular, Ionic, Cordova, React Native, Bootstrap, Agile, REST Services...',
    },
    {
      when: '2016',
      where: 'FREELANCE',
      name: 'Developer',
      description:
        'ASA Charity : Used .net c# and sql and completed the website',
    },
    {
      when: '2014',
      where: 'FREELANCE',
      name: 'UI Developer',
      description:
        'Premier Cosmetic Surgery: developed interface using HTML, CSS, jQuery',
    },
    {
      when: '2012 - 2013',
      where: 'PROJECT',
      name: 'Developer',
      description:
        'Used .net c# and sql as technologies and written a web portal for final year project at university',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
