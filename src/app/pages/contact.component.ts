import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContactinfoComponent } from '../components/contactinfo.component';

@Component({
  selector: 'pfo-contact',
  template: ` <pfo-contactinfo /> `,
  styles: [],
  standalone: true,
  imports: [RouterLink, ContactinfoComponent]
})
export class ContactComponent {}
