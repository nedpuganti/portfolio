import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations: any[] = [
    {
      when: '2015 - 2016',
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
  ];

  constructor() {}

  ngOnInit() {}
}
