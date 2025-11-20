import { Component, inject, OnInit, Renderer2 } from '@angular/core';
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
  imports: [RouterOutlet],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class AppComponent implements OnInit {
  readonly renderer: Renderer2 = inject(Renderer2);

  ngOnInit(): void {
    this.initLoader();
  }

  onResize(): void {
    this.renderer.setStyle(document.documentElement, 'height', `${window.innerHeight}px`);
  }

  initLoader(): void {
    const preLoadElement = this.renderer.selectRootElement('#pre-load', true);
    if (preLoadElement) {
      this.renderer.setStyle(preLoadElement, 'transition', 'opacity 1s ease-in-out');
      this.renderer.setStyle(preLoadElement, 'opacity', '1');

      setTimeout(() => {
        this.renderer.setStyle(preLoadElement, 'display', 'none');
      }, 1000);
    }
  }
}
