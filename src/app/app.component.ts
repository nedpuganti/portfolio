import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
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
