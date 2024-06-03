import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pfo-root',
  template: `
    <!-- Pre Load Starts -->
    <div id="pre-load">
      <div class="load-circle"></div>
    </div>
    <!-- Pre Load Ends -->
    <router-outlet />
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
    document.documentElement.style.height = `${event.target.innerHeight}px`;
  }

  initLoader(): void {
    const preLoadElement = document.getElementById('pre-load');
    if (preLoadElement) {
      preLoadElement.style.transition = 'opacity 1s ease-in-out';
      preLoadElement.style.opacity = '1';

      setTimeout(() => {
        preLoadElement.style.display = 'none';
      }, 1000);
    }
  }
}
