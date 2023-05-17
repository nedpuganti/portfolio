import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonalinfoComponent } from '../components/personalinfo.component';
import { ServicesComponent } from '../components/services.component';

@Component({
  selector: 'pfo-about',
  template: `
    <pfo-personalinfo></pfo-personalinfo>
    <pfo-services></pfo-services>
  `,
  styles: [],
  standalone: true,
  imports: [RouterLink, PersonalinfoComponent, ServicesComponent]
})
export class AboutComponent {}
