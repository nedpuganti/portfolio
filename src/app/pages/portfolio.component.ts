import { Component } from '@angular/core';

import { ProjectsComponent } from '../components/projects.component';

@Component({
  selector: 'pfo-portfolio',
  template: ` <pfo-projects /> `,
  styles: [],
  imports: [ProjectsComponent]
})
export class PortfolioComponent {}
