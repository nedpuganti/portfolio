import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectsComponent } from '../components/projects.component';

@Component({
  selector: 'pfo-portfolio',
  template: ` <pfo-projects /> `,
  styles: [],
  standalone: true,
  imports: [RouterLink, ProjectsComponent]
})
export class PortfolioComponent {}
