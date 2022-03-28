import { Component, OnInit } from '@angular/core';
import { RegisterService } from '@app/services/register.service';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss'],
})
export class PersonalinfoComponent implements OnInit {
  personalInfo: any = {
    summary: `I am a Full Stack Web Developer from Atlanta, USA. I am very passionate and dedicated to my work.I have ${this.registerService.getExperienceYearsCount()} years more work experience and enjoy working in a team or individual.`,
    firstName: 'Naren',
    lastName: 'Edpuganti',
    dob: 'June 1991',
    nationality: 'India',
    phoneNumber: '4239028634',
    email: 'contact@narenedpuganti.com',
    address: 'N/A',
    languages: 'Telugu, English',
  };

  cvLink = '#';
  githubLink = 'https://github.com/nedpuganti';

  constructor(private registerService: RegisterService) {}

  ngOnInit() {}
}
