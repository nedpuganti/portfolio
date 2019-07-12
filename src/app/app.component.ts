import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
    this.initHeight();
  }

  ngOnInit() {
    this.initLoader();
  }

  initHeight() {
    $('html').css({
      height: $(window).height(),
    });
  }

  initLoader() {
    $('#pre-load').fadeOut(1000);
  }
}
