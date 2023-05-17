import { Component, inject } from '@angular/core';
import { AppService } from '@app/app.service';
import { NgxMaskPipe } from 'ngx-mask';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { PersonalInfo } from '@app/interfaces/personal.interface';

@Component({
  selector: 'pfo-personalinfo',
  template: `
    <ng-container
      *ngIf="{
        personalInfo: personalInfo$ | async
      } as data"
    >
      <!-- Personal Info Starts -->
      <div id="personal-info" *ngIf="data?.personalInfo">
        <!-- Personal Info Heading Starts -->
        <h5>Personal Info</h5>
        <!-- Personal Info Heading Ends -->
        <div class="row no-gutters">
          <!-- Profile Picture Starts -->
          <div class="profile-picture col-md-2 col-sm-3 col-12"></div>
          <!-- Profile Picture Ends -->
          <!-- Summary Starts -->
          <div class="summary col-md-10 col-sm-9 col-12">
            <!-- Single Paragraph Starts -->
            <p [innerHtml]="data?.personalInfo?.summary"></p>
            <!-- Single Paragraph Ends -->
          </div>
          <!-- Summary Ends -->
          <!-- Single Profile Starts -->
          <div class="profile col-12 col-sm-6">
            <ul>
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>First Name</span> </span>
                <span class="dash">-</span>
                <span class="value">{{ data?.personalInfo?.firstName }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>Last Name</span> </span>
                <span class="dash">-</span>
                <span class="value">{{ data?.personalInfo?.lastName }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>Date of Birth</span> </span>
                <span class="dash">-</span>
                <span class="value">{{ data?.personalInfo?.dob }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>Nationality</span> </span>
                <span class="dash">-</span>
                <span class="value">{{ data?.personalInfo?.nationality }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
            </ul>
          </div>
          <!-- Single Profile Ends -->
          <!-- Single Profile Starts -->
          <div class="profile col-12 col-sm-6">
            <ul>
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>Phone</span> </span>
                <span class="dash">-</span>
                <span class="value">+1 {{ (data?.personalInfo)!.phoneNumber | mask : '(000) 000-0000' }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>Email</span> </span>
                <span class="dash">-</span>
                <span class="value">{{ data?.personalInfo?.email }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>Address</span> </span>
                <span class="dash">-</span>
                <span class="value">{{ data?.personalInfo?.address }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
              <!-- Single Content On Profile Starts -->
              <li>
                <span class="label"> <i class="fas fa-angle-double-right"></i><span>Languages</span> </span>
                <span class="dash">-</span>
                <span class="value">{{ data?.personalInfo?.languages }}</span>
              </li>
              <!-- Single Content On Profile Ends -->
            </ul>
          </div>
          <!-- Single Profile Ends -->
          <!-- Social Media Starts -->
          <div class="social-media col-12">
            <ul>
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
              <!-- <li>
          <a href="#">
            <span class="front">
              <i class="fab fa-twitter"></i>
            </span>
            <span class="back">
              <i class="fab fa-twitter"></i>
            </span>
          </a>
        </li> -->
              <!-- Single Social Media Ends -->
              <!-- Single Social Media Starts -->
              <li>
                <a [href]="githubLink" target="_blank">
                  <span class="front">
                    <i class="fab fa-github"></i>
                  </span>
                  <span class="back">
                    <i class="fab fa-github"></i>
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
          </div>
          <!-- Social Media Ends -->
          <!-- Button Wrapper Starts -->
          <div class="button-wrapper col-12">
            <!-- Single Button Starts -->
            <div class="single-button">
              <a [href]="cvLink" target="_blank">
                <span class="front">
                  <i class="fas fa-file-pdf"></i><span class="value">Download <span>CV</span></span>
                </span>
                <span class="back">
                  <i class="fas fa-file-pdf"></i><span class="value">Download <span>CV</span></span>
                </span>
              </a>
            </div>
            <!-- Single Button Ends -->
            <!-- Single Button Starts -->
            <div class="single-button" id="contact-me">
              <a [routerLink]="['/contact']" id="contact-button">
                <span class="front">
                  <i class="fas fa-envelope"></i><span class="value">Contact <span>Me</span></span>
                </span>
                <span class="back">
                  <i class="fas fa-envelope"></i><span class="value">Contact <span>Me</span></span>
                </span>
              </a>
            </div>
            <!-- Single Button Ends -->
          </div>
          <!-- Button Wrapper Ends -->
        </div>
      </div>
      <!-- Personal Info Ends -->
    </ng-container>
  `,
  styles: [],
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, NgxMaskPipe]
})
export class PersonalinfoComponent {
  registerService = inject(AppService);

  personalInfo$: Observable<PersonalInfo> = this.registerService.getPersonalInfo();

  cvLink = '#';
  githubLink = 'https://github.com/nedpuganti';
}
