import { Component } from '@angular/core';
import { ContactinfoComponent } from '../components/contactinfo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pfo-contact',
  template: ` <pfo-contactinfo/> `,
  styles: [],
  standalone: true,
  imports: [RouterLink, ContactinfoComponent]
})
export class ContactComponent {}
