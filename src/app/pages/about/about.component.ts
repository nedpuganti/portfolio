import { Component } from '@angular/core';
import { ServicesComponent } from '../../components/services/services.component';
import { PersonalinfoComponent } from '../../components/personalinfo/personalinfo.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: true,
    imports: [RouterLink, PersonalinfoComponent, ServicesComponent]
})
export class AboutComponent {}
