import { Component, inject } from '@angular/core';
import { AppService } from '@app/app.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { FunFacts } from '@app/interfaces/personal.interface';

@Component({
  selector: 'pfo-funfacts',
  template: `
    <!-- Fun Facts Starts -->
    <div class="fun-facts">
      <!-- Fun Facts Heading Starts -->
      <h5>Fun Facts</h5>
      <!-- Fun Facts Heading Ends -->
      <div class="row no-gutters">
        <!-- Single Fun Fact Starts -->
        <div class="single-fun-fact col-12 col-sm-4" *ngFor="let fact of funFacts$ | async">
          <ul>
            <li class="fun-fact-icon">
              <i class="fas fa-business-time fa-3x"></i>
            </li>
            <li class="fun-fact-value">{{ fact.value }}+</li>
            <li class="fun-fact-body">
              <i class="fas fa-angle-double-right"></i><span>{{ fact.name }}</span>
            </li>
          </ul>
        </div>
        <!-- Single Fun Fact Ends -->
      </div>
    </div>
    <!-- Fun Facts Ends -->
  `,
  styles: [],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class FunfactsComponent {
  registerService = inject(AppService);

  funFacts$: Observable<FunFacts[]> = this.registerService.getFunFacts();
}
