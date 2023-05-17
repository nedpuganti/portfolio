import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { AppService } from '@app/app.service';
import { Service } from '@app/interfaces/service.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'pfo-services',
  template: `
    <!-- Services Starts -->
    <div id="services">
      <!-- Services Heading Starts -->
      <h5>Services</h5>
      <!-- Services Heading Ends -->
      <div class="row no-gutters">
        <!-- Single Service Starts -->
        <div class="single-service col-sm-6 col-12" *ngFor="let service of services$ | async; let i = index">
          <ul>
            <li class="service-number">
              <span class="first-word">Service </span>
              <span class="second-word">{{ i + 1 }}</span>
            </li>
            <li>
              <ul>
                <li class="service-name">
                  <i class="fas fa-angle-double-right"></i><span>{{ service.name }}</span>
                </li>
                <li class="service-body">
                  <p class="mb-0" *ngFor="let type of service.types">{{ type }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- Single Service Ends -->
      </div>
    </div>
    <!-- Services Ends -->
  `,
  styles: [],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class ServicesComponent {
  registerService = inject(AppService);

  services$: Observable<Service[]> = this.registerService.getServices();
}
