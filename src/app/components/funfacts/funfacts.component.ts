import { Component, OnInit } from '@angular/core';
import { RegisterService } from '@app/services/register.service';

@Component({
  selector: 'app-funfacts',
  templateUrl: './funfacts.component.html',
  styleUrls: ['./funfacts.component.scss'],
})
export class FunfactsComponent implements OnInit {
  funFacts: any[] = [
    {
      name: 'Years Experience',
      value: this.registerService.getExperienceYearsCount(),
    },
    {
      name: 'Done Projects',
      value: 40,
    },
    {
      name: 'Happy Clients',
      value: 20,
    },
  ];
  constructor(private registerService: RegisterService) {}

  ngOnInit() {}
}
