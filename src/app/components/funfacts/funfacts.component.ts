import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funfacts',
  templateUrl: './funfacts.component.html',
  styleUrls: ['./funfacts.component.scss']
})
export class FunfactsComponent implements OnInit {
  funFacts: any[] = [
    {
      name: 'Years Experience',
      value: 5
    },
    {
      name: 'Done Projects',
      value: 30
    },
    {
      name: 'Happy Clients',
      value: 20
    }
  ];
  constructor() {}

  ngOnInit() {}
}
