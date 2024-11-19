import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppService } from '../app.service';
import { ContactInfo } from '../interfaces/personal.interface';

@Component({
  selector: 'pfo-contactinfo',
  template: `
    <!-- Contact Info Starts -->
    @let contactInfo = contactInfo$();
    @if (contactInfo) {
      <div id="contact-info">
        <!-- Contact Info Heading Starts -->
        <h5>Contact Info</h5>
        <!-- Contact Info Heading Ends -->
        <div class="row no-gutters">
          <!-- List Contact Info Starts -->
          <div class="list-contact-info col-12">
            <ul class="row no-gutters">
              <!-- Single Contact Info Starts -->
              <li class="col-sm-6 col-12">
                <span class="contact-info-name">Address</span>
                <span class="icon-of-value">
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <span class="value">{{ contactInfo?.address }}</span>
              </li>
              <!-- Single Contact Info Ends -->
              <!-- Single Contact Info Starts -->
              <li class="col-sm-6 col-12">
                <span class="contact-info-name">Phone</span>
                <span class="icon-of-value">
                  <i class="fas fa-mobile-alt"></i>
                </span>
                <span class="value">+1 {{ contactInfo?.phoneNumber }}</span>
              </li>
              <!-- Single Contact Info Ends -->
              <!-- Single Contact Info Starts -->
              <li class="col-sm-6 col-12">
                <span class="contact-info-name">Email</span>
                <span class="icon-of-value">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="value">{{ contactInfo?.email }}</span>
              </li>
              <!-- Single Contact Info Ends -->
              <!-- Single Contact Info Starts -->
              <li class="col-sm-6 col-12">
                <span class="contact-info-name">Website</span>
                <span class="icon-of-value">
                  <i class="fas fa-globe"></i>
                </span>
                <span class="value">{{ contactInfo?.website }}</span>
              </li>
              <!-- Single Contact Info Ends -->
              <!-- Single Contact Info Starts -->
              <li class="col-12">
                <span class="contact-info-name">Social Media</span>
                <ul class="social-media">
                  <!-- Single Social Media Starts -->
                  <!-- <li>
                      <a href="#">
                        <span class="front">
                          <i class="fab fa-facebook-f"></i>
                        </span>
                        <span class="back">
                          <i class="fab fa-facebook-f"></i>
                        </span>
                      </a>
                    </li> -->
                  <!-- Single Social Media Ends -->
                  <!-- Single Social Media Starts -->
                  <li>
                    <a [href]="twitterLink" target="_blank">
                      <span class="front">
                        <i class="fab fa-twitter"></i>
                      </span>
                      <span class="back">
                        <i class="fab fa-twitter"></i>
                      </span>
                    </a>
                  </li>
                  <!-- Single Social Media Ends -->
                  <!-- Single Social Media Starts -->
                  <li>
                    <a [href]="instagramLink" target="_blank">
                      <span class="front">
                        <i class="fab fa-instagram"></i>
                      </span>
                      <span class="back">
                        <i class="fab fa-instagram"></i>
                      </span>
                    </a>
                  </li>
                  <!-- Single Social Media Ends -->
                  <!-- Single Social Media Starts -->
                  <!-- <li>
                      <a href="#">
                        <span class="front">
                          <i class="fab fa-linkedin-in"></i>
                        </span>
                        <span class="back">
                          <i class="fab fa-linkedin-in"></i>
                        </span>
                      </a>
                    </li> -->
                  <!-- Single Social Media Ends -->
                </ul>
              </li>
              <!-- Single Contact Info Ends -->
            </ul>
          </div>
          <!-- List Contact Info Ends -->
        </div>
      </div>
    }
    <!-- Contact Info Ends -->
  `,
  styles: []
})
export class ContactinfoComponent {
  readonly registerService: AppService = inject(AppService);

  contactInfo$: Signal<ContactInfo | undefined> = toSignal(this.registerService.getContactInfo());

  instagramLink = 'https://www.instagram.com/itsmenarene';
  twitterLink = 'https://twitter.com/itsmenarene';
}
