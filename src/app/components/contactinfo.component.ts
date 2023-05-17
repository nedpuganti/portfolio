import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppService } from '@app/app.service';
import { ContactInfo } from '@app/interfaces/personal.interface';
import { NgxMaskPipe } from 'ngx-mask';
import { Observable } from 'rxjs';

@Component({
  selector: 'pfo-contactinfo',
  template: `
    <ng-container
      *ngIf="{
        contactInfo: contactInfo$ | async
      } as data"
    >
      <!-- Contact Info Starts -->
      <div id="contact-info" *ngIf="data?.contactInfo">
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
                <span class="value">{{ data?.contactInfo?.address }}</span>
              </li>
              <!-- Single Contact Info Ends -->
              <!-- Single Contact Info Starts -->
              <li class="col-sm-6 col-12">
                <span class="contact-info-name">Phone</span>
                <span class="icon-of-value">
                  <i class="fas fa-mobile-alt"></i>
                </span>
                <span class="value">+1 {{ (data?.contactInfo)!.phoneNumber | mask : '(000) 000-0000' }}</span>
              </li>
              <!-- Single Contact Info Ends -->
              <!-- Single Contact Info Starts -->
              <li class="col-sm-6 col-12">
                <span class="contact-info-name">Email</span>
                <span class="icon-of-value">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="value">{{ data?.contactInfo?.email }}</span>
              </li>
              <!-- Single Contact Info Ends -->
              <!-- Single Contact Info Starts -->
              <li class="col-sm-6 col-12">
                <span class="contact-info-name">Website</span>
                <span class="icon-of-value">
                  <i class="fas fa-globe"></i>
                </span>
                <span class="value">{{ data?.contactInfo?.website }}</span>
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
      <!-- Contact Info Ends -->
    </ng-container>
  `,
  styles: [],
  standalone: true,
  imports: [AsyncPipe, NgIf, NgxMaskPipe]
})
export class ContactinfoComponent {
  registerService = inject(AppService);

  contactInfo$: Observable<ContactInfo> = this.registerService.getContactInfo();

  instagramLink = 'https://www.instagram.com/nedpuganti';
  twitterLink = 'https://twitter.com/nedpuganti91';
}
