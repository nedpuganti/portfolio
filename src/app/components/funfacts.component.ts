import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppService } from '../app.service';
import { FunFacts } from '../interfaces/personal.interface';

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
        @for (fact of funFacts$(); track $index) {
          <div class="single-fun-fact col-12 col-sm-4">
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
        }
        <!-- Single Fun Fact Ends -->
      </div>
    </div>
    <!-- Fun Facts Ends -->
  `,
  styles: [],
  standalone: true
})
export class FunfactsComponent {
  readonly registerService = inject(AppService);

  funFacts$: Signal<FunFacts[]> = toSignal(this.registerService.getFunFacts(), { initialValue: [] });
}
