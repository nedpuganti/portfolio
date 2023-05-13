import { Component } from '@angular/core';

@Component({
  selector: 'app-contactinfo',
  templateUrl: './contactinfo.component.html',
  styleUrls: ['./contactinfo.component.scss']
})
export class ContactinfoComponent {
  contactInfo: any = {
    phoneNumber: '4239028634',
    email: 'contact@narenedpuganti.com',
    address: 'N/A',
    website: 'www.narenedpuganti.com'
  };

  instagramLink = 'https://www.instagram.com/nedpuganti';
  twitterLink = 'https://twitter.com/nedpuganti91';
}