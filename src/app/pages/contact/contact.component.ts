import { Component } from '@angular/core';
import { ContactinfoComponent } from '../../components/contactinfo/contactinfo.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [ContactinfoComponent]
})
export class ContactComponent {}
