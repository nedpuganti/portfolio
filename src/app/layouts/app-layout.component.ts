import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pfo-layout',
  template: `
    <!-- Wrapper Starts -->
    <div id="wrapper">
      <div class="container-fluid">
        <div class="row no-gutters v-full">
          <!-- Left Wrapper Starts -->
          <div id="left-wrapper" class="col-12 col-md-8">
            <router-outlet />
          </div>
          <!-- Left Wrapper Ends -->
          <!-- Right Wrapper Starts -->
          <div id="right-wrapper" class="col-md-4">
            <!-- Large Profile Picture Starts -->
            <div class="lg-profile-picture"></div>
            <!-- Large Profile Picture Ends -->
          </div>
          <!-- Right Wrapper Ends -->
        </div>
      </div>
    </div>
    <!-- Wrapper Ends -->
  `,
  styles: [],
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {}
