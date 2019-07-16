import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})
export class PersonalinfoComponent implements OnInit {
  personalInfo: any = {
    summary:
      'I am a Full Stack Web Developer from Atlanta, USA. I am very passionate and dedicated to my work.I have 5 years more work experience.And enjoy working in a team or individual.',
    firstName: 'Naren',
    lastName: 'Edpuganti',
    dob: 'June 1991',
    nationality: 'India',
    phoneNumber: '4702224996',
    email: 'contact@narenedpuganti.com',
    address: 'N/A',
    languages: 'Telugu, English'
  };

  cvLink = 'https://zety.com/mycv/naren-edpuganti';
  githubLink = 'https://github.com/narenedpuganti';

  constructor() {}

  ngOnInit() {}
}
