import { Component } from '@angular/core';
import { ProjectsComponent } from '../components/projects.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  template: ` <app-projects></app-projects> `,
  styles: [],
  standalone: true,
  imports: [RouterLink, ProjectsComponent]
})
export class PortfolioComponent {}
