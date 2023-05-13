import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
    standalone: true,
    imports: [ProjectsComponent]
})
export class PortfolioComponent {}
