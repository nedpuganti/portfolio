import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pfo-root',
  template: `
    <!-- Pre Load Starts -->
    <div id="pre-load">
      <div class="load-circle"></div>
    </div>
    <!-- Pre Load Ends -->
    <router-outlet></router-outlet>
  `,
  styles: [],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.initLoader();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerHeight: string | number | null } }): void {
    $('html').css({
      height: event.target.innerHeight
    });
  }

  initLoader(): void {
    $('#pre-load').fadeOut(1000);
  }
}
