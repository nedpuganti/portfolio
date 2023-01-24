import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
