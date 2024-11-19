import { Component } from '@angular/core';

import { ContactinfoComponent } from '../components/contactinfo.component';

@Component({
  selector: 'pfo-contact',
  template: ` <pfo-contactinfo /> `,
  styles: [],
  imports: [ContactinfoComponent]
})
export class ContactComponent {}
