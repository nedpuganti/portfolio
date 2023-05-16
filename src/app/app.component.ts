import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
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
  ngOnInit() {
    this.initLoader();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    $('html').css({
      height: event.target.innerHeight
    });
  }

  initLoader() {
    $('#pre-load').fadeOut(1000);
  }
}
