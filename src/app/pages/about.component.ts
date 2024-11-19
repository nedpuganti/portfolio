import { Component } from '@angular/core';

import { PersonalinfoComponent } from '../components/personalinfo.component';
import { ServicesComponent } from '../components/services.component';

@Component({
  selector: 'pfo-about',
  template: `
    <pfo-personalinfo />
    <pfo-services />
  `,
  styles: [],
  imports: [PersonalinfoComponent, ServicesComponent]
})
export class AboutComponent {}
